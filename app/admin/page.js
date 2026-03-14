'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function AdminPanel() {
  const [session,    setSession]    = useState(null)
  const [email,      setEmail]      = useState('')
  const [password,   setPassword]   = useState('')
  const [authError,  setAuthError]  = useState('')
  const [tab,        setTab]        = useState('lifefeed')
  const [messages,   setMessages]   = useState([])
  const [contacts,   setContacts]   = useState([])

  // Life Feed form
  const [feedForm, setFeedForm] = useState({
    title: '', description: '', category: 'Community', location: ''
  })

  // Blog form
  const [blogForm, setBlogForm] = useState({
    title: '', slug: '', excerpt: '', content: '', tags: ''
  })

  const [projectForm, setProjectForm] = useState({
    title: '', description: '', tech_stack: '', live_url: '', github_url: '', featured: false
  })

  // Achievement form
  const [achieveForm, setAchieveForm] = useState({
    title:       '',
    description: '',
    category:    'Award',
    date:        '',
    issuer:      '',
    featured:    false,
  })
  const [achieveImage,   setAchieveImage]   = useState(null)
  const [imagePreview,   setImagePreview]   = useState(null)
  const [uploadProgress, setUploadProgress] = useState('')

  // Life Feed Image State
  const [feedImage, setFeedImage]     = useState(null)
  const [feedPreview, setFeedPreview] = useState(null)

  const [saving, setSaving] = useState(false)
  const [saved,  setSaved]  = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  useEffect(() => {
    if (session) {
      fetchMessages()
      fetchContacts()
    }
  }, [session])

  async function fetchMessages() {
    const { data } = await supabase
      .from('guestbook')
      .select('*')
      .order('created_at', { ascending: false })
    setMessages(data || [])
  }

  async function fetchContacts() {
    const { data } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false })
    setContacts(data || [])
  }

  const handleLogin = async () => {
    setAuthError('')
    const { error } = await supabase.auth.signInWithPassword({
      email, password
    })
    if (error) setAuthError(error.message)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  const showSaved = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const uploadImage = async (file, folder) => {
    if (!file) return null
    const ext      = file.name.split('.').pop()
    const fileName = `${folder}/${Date.now()}.${ext}`

    const { data, error } = await supabase
      .storage
      .from('portfolio-images')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert:       false,
      })

    if (error) {
      console.error('Upload error:', error)
      return null
    }

    const { data: urlData } = supabase
      .storage
      .from('portfolio-images')
      .getPublicUrl(fileName)

    return urlData.publicUrl
  }

  const handleImageSelect = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setAchieveImage(file)
    const reader = new FileReader()
    reader.onload  = (e) => setImagePreview(e.target.result)
    reader.readAsDataURL(file)
  }

  const handleFeedImage = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setFeedImage(file)
    const reader = new FileReader()
    reader.onload  = (e) => setFeedPreview(e.target.result)
    reader.readAsDataURL(file)
  }

  const saveFeed = async () => {
    setSaving(true)
    setUploadProgress('Uploading image...')
    let image_url = null
    if (feedImage) {
      image_url = await uploadImage(feedImage, 'lifefeed')
    }
    setUploadProgress('Saving post...')
    await supabase.from('life_feed').insert([{ ...feedForm, image_url }])
    setFeedForm({
      title: '', description: '', category: 'Community', location: ''
    })
    setFeedImage(null)
    setFeedPreview(null)
    setUploadProgress('')
    setSaving(false)
    showSaved()
  }

  const saveAchievement = async () => {
    setSaving(true)
    setUploadProgress('Uploading image...')

    let image_url = null
    if (achieveImage) {
      image_url = await uploadImage(achieveImage, 'achievements')
    }

    setUploadProgress('Saving achievement...')

    const { error } = await supabase
      .from('achievements')
      .insert([{ ...achieveForm, image_url }])

    if (!error) {
      setAchieveForm({
        title: '', description: '', category: 'Award',
        date: '', issuer: '', featured: false,
      })
      setAchieveImage(null)
      setImagePreview(null)
      showSaved()
    }

    setUploadProgress('')
    setSaving(false)
  }

  const saveBlog = async () => {
    setSaving(true)
    const payload = {
      ...blogForm,
      tags:      blogForm.tags.split(',').map(t => t.trim()).filter(Boolean),
      published: true,
    }
    await supabase.from('blogs').insert([payload])
    setBlogForm({ title:'', slug:'', excerpt:'', content:'', tags:'' })
    setSaving(false)
    showSaved()
  }

  const saveProject = async () => {
    setSaving(true)
    const payload = {
      ...projectForm,
      tech_stack: projectForm.tech_stack
        .split(',').map(t => t.trim()).filter(Boolean),
    }
    await supabase.from('projects').insert([payload])
    setProjectForm({
      title:'', description:'', tech_stack:'',
      live_url:'', github_url:'', featured: false
    })
    setSaving(false)
    showSaved()
  }

  const deleteGuestbook = async (id) => {
    await supabase.from('guestbook').delete().eq('id', id)
    fetchMessages()
  }

  // ── Styles ──────────────────────────────────────────
  const inputStyle = {
    width:        '100%',
    padding:      '12px 16px',
    border:       '1px solid #E2E8F0',
    borderRadius: '10px',
    fontSize:     '14px',
    outline:      'none',
    fontFamily:   'Satoshi, sans-serif',
    color:        '#0A0A0A',
    background:   '#F8F9FA',
    boxSizing:    'border-box',
    marginBottom: '12px',
    transition:   'border-color 0.2s',
  }

  const btnStyle = {
    background:  '#0A0A0A',
    color:       '#FFFFFF',
    padding:     '12px 28px',
    borderRadius:'10px',
    border:      'none',
    fontSize:    '14px',
    fontWeight:  '600',
    cursor:      'pointer',
    fontFamily:  'Satoshi, sans-serif',
  }

  // ── Login Screen ────────────────────────────────────
  if (!session) return (
    <div style={{
      display:        'flex',
      justifyContent: 'center',
      alignItems:     'center',
      minHeight:      '100vh',
      background:     '#F8F9FA',
    }}>
      <div style={{
        background:   '#FFFFFF',
        border:       '1px solid #E2E8F0',
        borderRadius: '24px',
        padding:      '48px',
        width:        '100%',
        maxWidth:     '400px',
      }}>
        <h1 style={{
          fontSize:     '28px',
          fontWeight:   '700',
          color:        '#0A0A0A',
          fontFamily:   'Clash Display, sans-serif',
          marginBottom: '8px',
        }}>
          Admin Login
        </h1>
        <p style={{
          color:        '#64748B',
          fontSize:     '14px',
          marginBottom: '32px',
        }}>
          Your private portfolio dashboard
        </p>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={inputStyle}
        />
        {authError && (
          <p style={{ color: '#DC2626', fontSize: '14px', marginBottom: '12px' }}>
            {authError}
          </p>
        )}
        <button onClick={handleLogin} style={{ ...btnStyle, width: '100%' }}>
          Login →
        </button>
      </div>
    </div>
  )

  // ── Dashboard ───────────────────────────────────────
  const TABS = [
    { id: 'lifefeed', label: '📸 Life Feed'  },
    { id: 'blog',     label: '✍️ Blog'       },
    { id: 'projects',     label: '💻 Projects'   },
    { id: 'achievements', label: '🏆 Achievements' },
    { id: 'messages',     label: '💬 Guestbook'  },
    { id: 'contacts', label: '📧 Contacts'   },
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#F8F9FA' }}>

      {/* Admin Navbar */}
      <div style={{
        background:     '#FFFFFF',
        borderBottom:   '1px solid #E2E8F0',
        padding:        '16px 40px',
        display:        'flex',
        justifyContent: 'space-between',
        alignItems:     'center',
        position:       'sticky',
        top:            0,
        zIndex:         100,
      }}>
        <h1 style={{
          fontSize:   '18px',
          fontWeight: '700',
          color:      '#0A0A0A',
          fontFamily: 'Clash Display, sans-serif',
        }}>
          Admin Panel
          <span style={{ color: '#2563EB' }}>.</span>
        </h1>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          {saved && (
            <span style={{ color: '#166534', fontSize: '14px', fontWeight: '500' }}>
              ✅ Saved!
            </span>
          )}
          <a href="/" style={{
            color: '#64748B', fontSize: '14px', textDecoration: 'none'
          }}>
            View Site →
          </a>
          <button onClick={handleLogout} style={{
            background: 'transparent',
            border:     '1px solid #E2E8F0',
            borderRadius:'8px',
            padding:    '8px 16px',
            fontSize:   '14px',
            cursor:     'pointer',
            color:      '#64748B',
          }}>
            Logout
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', minHeight: 'calc(100vh - 65px)' }}>

        {/* Sidebar */}
        <div style={{
          width:        '220px',
          background:   '#FFFFFF',
          borderRight:  '1px solid #E2E8F0',
          padding:      '24px 16px',
          flexShrink:   0,
        }}>
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                display:     'block',
                width:       '100%',
                padding:     '12px 16px',
                borderRadius:'10px',
                border:      'none',
                background:  tab === t.id ? '#EFF6FF' : 'transparent',
                color:       tab === t.id ? '#2563EB'  : '#64748B',
                fontWeight:  tab === t.id ? '600'      : '400',
                fontSize:    '14px',
                textAlign:   'left',
                cursor:      'pointer',
                marginBottom:'4px',
                fontFamily:  'Satoshi, sans-serif',
                transition:  'all 0.2s',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ flex: 1, padding: '40px' }}>

          {/* LIFE FEED TAB */}
          {tab === 'lifefeed' && (
            <div style={{ maxWidth: '600px' }}>
              <h2 style={{
                fontSize:'24px', fontWeight:'700', color:'#0A0A0A',
                fontFamily:'Clash Display, sans-serif', marginBottom:'24px'
              }}>
                Post to Life Feed
              </h2>
              
              {/* Image Upload for Life Feed */}
              <div style={{
                border:       '2px dashed #E2E8F0',
                borderRadius: '16px',
                padding:      '24px',
                textAlign:    'center',
                marginBottom: '16px',
                background:   '#F8F9FA',
                cursor:       'pointer',
              }}
              onClick={() =>
                document.getElementById('feed-upload').click()
              }
              >
                {feedPreview ? (
                  <div>
                    <img
                      src={feedPreview}
                      alt="Preview"
                      style={{
                        maxHeight:    '160px',
                        maxWidth:     '100%',
                        borderRadius: '8px',
                        marginBottom: '8px',
                        objectFit:    'cover',
                      }}
                    />
                    <p style={{
                      color:    '#2563EB',
                      fontSize: '12px',
                      fontWeight:'600',
                    }}>
                      ✅ Click to change image
                    </p>
                  </div>
                ) : (
                  <p style={{ color: '#64748B', fontSize: '14px' }}>
                    📸 Click to add photo (optional)
                  </p>
                )}
                <input
                  id="feed-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFeedImage}
                  style={{ display: 'none' }}
                />
              </div>

              <input
                placeholder="Title *"
                value={feedForm.title}
                onChange={e => setFeedForm({...feedForm, title: e.target.value})}
                style={inputStyle}
              />
              <textarea
                placeholder="Description"
                value={feedForm.description}
                onChange={e => setFeedForm({...feedForm, description: e.target.value})}
                rows={3}
                style={{ ...inputStyle, resize: 'vertical' }}
              />
              <select
                value={feedForm.category}
                onChange={e => setFeedForm({...feedForm, category: e.target.value})}
                style={inputStyle}
              >
                {['Travel','Community','Learning','Event','Personal'].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <input
                placeholder="Location (optional)"
                value={feedForm.location}
                onChange={e => setFeedForm({...feedForm, location: e.target.value})}
                style={inputStyle}
              />

              {uploadProgress && (
                <p style={{ color: '#2563EB', fontSize: '14px', marginBottom: '12px', fontWeight: '500' }}>
                  ⏳ {uploadProgress}
                </p>
              )}

              <button onClick={saveFeed} disabled={saving} style={btnStyle}>
                {saving ? 'Posting...' : 'Post to Life Feed ✨'}
              </button>
            </div>
          )}

          {/* BLOG TAB */}
          {tab === 'blog' && (
            <div style={{ maxWidth: '700px' }}>
              <h2 style={{
                fontSize:'24px', fontWeight:'700', color:'#0A0A0A',
                fontFamily:'Clash Display, sans-serif', marginBottom:'24px'
              }}>
                Write Blog Post
              </h2>
              <input
                placeholder="Title *"
                value={blogForm.title}
                onChange={e => setBlogForm({...blogForm, title: e.target.value})}
                style={inputStyle}
              />
              <input
                placeholder="Slug (URL) e.g. my-first-post *"
                value={blogForm.slug}
                onChange={e => setBlogForm({
                  ...blogForm,
                  slug: e.target.value
                    .toLowerCase()
                    .replace(/\s+/g, '-')
                    .replace(/[^a-z0-9-]/g, '')
                })}
                style={inputStyle}
              />
              <input
                placeholder="Excerpt (short description) *"
                value={blogForm.excerpt}
                onChange={e => setBlogForm({...blogForm, excerpt: e.target.value})}
                style={inputStyle}
              />
              <textarea
                placeholder="Full blog content *"
                value={blogForm.content}
                onChange={e => setBlogForm({...blogForm, content: e.target.value})}
                rows={12}
                style={{ ...inputStyle, resize: 'vertical' }}
              />
              <input
                placeholder="Tags (comma separated) e.g. React, Web Dev, Tips"
                value={blogForm.tags}
                onChange={e => setBlogForm({...blogForm, tags: e.target.value})}
                style={inputStyle}
              />
              <button onClick={saveBlog} disabled={saving} style={btnStyle}>
                {saving ? 'Publishing...' : 'Publish Blog Post →'}
              </button>
            </div>
          )}

          {/* PROJECTS TAB */}
          {tab === 'projects' && (
            <div style={{ maxWidth: '600px' }}>
              <h2 style={{
                fontSize:'24px', fontWeight:'700', color:'#0A0A0A',
                fontFamily:'Clash Display, sans-serif', marginBottom:'24px'
              }}>
                Add New Project
              </h2>
              <input
                placeholder="Project Title *"
                value={projectForm.title}
                onChange={e => setProjectForm({...projectForm, title: e.target.value})}
                style={inputStyle}
              />
              <textarea
                placeholder="Description *"
                value={projectForm.description}
                onChange={e => setProjectForm({...projectForm, description: e.target.value})}
                rows={3}
                style={{ ...inputStyle, resize: 'vertical' }}
              />
              <input
                placeholder="Tech Stack (comma separated) e.g. React, Node.js"
                value={projectForm.tech_stack}
                onChange={e => setProjectForm({...projectForm, tech_stack: e.target.value})}
                style={inputStyle}
              />
              <input
                placeholder="Live URL (optional)"
                value={projectForm.live_url}
                onChange={e => setProjectForm({...projectForm, live_url: e.target.value})}
                style={inputStyle}
              />
              <input
                placeholder="GitHub URL (optional)"
                value={projectForm.github_url}
                onChange={e => setProjectForm({...projectForm, github_url: e.target.value})}
                style={inputStyle}
              />
              <label style={{
                display:      'flex',
                alignItems:   'center',
                gap:          '10px',
                marginBottom: '20px',
                cursor:       'pointer',
                fontSize:     '14px',
                color:        '#64748B',
              }}>
                <input
                  type="checkbox"
                  checked={projectForm.featured}
                  onChange={e => setProjectForm({
                    ...projectForm, featured: e.target.checked
                  })}
                />
                Mark as Featured Project
              </label>
              <button onClick={saveProject} disabled={saving} style={btnStyle}>
                {saving ? 'Saving...' : 'Add Project →'}
              </button>
            </div>
          )}

          {/* ACHIEVEMENTS TAB */}
          {tab === 'achievements' && (
            <div style={{ maxWidth: '640px' }}>
              <h2 style={{
                fontSize:   '24px',
                fontWeight: '700',
                color:      '#0A0A0A',
                fontFamily: 'Clash Display, sans-serif',
                marginBottom:'24px',
              }}>
                Add Achievement / Photo
              </h2>

              {/* Image Upload Area */}
              <div style={{
                border:       '2px dashed #E2E8F0',
                borderRadius: '16px',
                padding:      '32px',
                textAlign:    'center',
                marginBottom: '20px',
                background:   '#F8F9FA',
                cursor:       'pointer',
                transition:   'all 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#2563EB'
                e.currentTarget.style.background  = '#EFF6FF'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = '#E2E8F0'
                e.currentTarget.style.background  = '#F8F9FA'
              }}
              onClick={() =>
                document.getElementById('achieve-upload').click()
              }
              >
                {imagePreview ? (
                  <div>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      style={{
                        maxHeight:    '200px',
                        maxWidth:     '100%',
                        borderRadius: '12px',
                        marginBottom: '12px',
                        objectFit:    'cover',
                      }}
                    />
                    <p style={{
                      color:    '#2563EB',
                      fontSize: '13px',
                      fontWeight:'600',
                    }}>
                      ✅ Image selected — click to change
                    </p>
                  </div>
                ) : (
                  <div>
                    <div style={{
                      fontSize:     '40px',
                      marginBottom: '12px',
                    }}>
                      📸
                    </div>
                    <p style={{
                      color:      '#64748B',
                      fontSize:   '15px',
                      fontWeight: '500',
                    }}>
                      Click to upload image
                    </p>
                    <p style={{
                      color:    '#94A3B8',
                      fontSize: '12px',
                      marginTop:'4px',
                    }}>
                      JPG, PNG, WEBP — Max 5MB
                    </p>
                  </div>
                )}
                <input
                  id="achieve-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  style={{ display: 'none' }}
                />
              </div>

              {/* Form Fields */}
              <input
                placeholder="Title * (e.g. Gold Medal — Academic Excellence)"
                value={achieveForm.title}
                onChange={e => setAchieveForm({
                  ...achieveForm, title: e.target.value
                })}
                style={inputStyle}
              />

              <textarea
                placeholder="Description (optional)"
                value={achieveForm.description}
                onChange={e => setAchieveForm({
                  ...achieveForm, description: e.target.value
                })}
                rows={3}
                style={{ ...inputStyle, resize: 'vertical' }}
              />

              <select
                value={achieveForm.category}
                onChange={e => setAchieveForm({
                  ...achieveForm, category: e.target.value
                })}
                style={inputStyle}
              >
                {['Award','Certificate','Community',
                  'Event','Hackathon','Personal'].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>

              <input
                placeholder="Issuer / Organization (e.g. Ganpat University)"
                value={achieveForm.issuer}
                onChange={e => setAchieveForm({
                  ...achieveForm, issuer: e.target.value
                })}
                style={inputStyle}
              />

              <input
                placeholder="Date (e.g. March 2024)"
                value={achieveForm.date}
                onChange={e => setAchieveForm({
                  ...achieveForm, date: e.target.value
                })}
                style={inputStyle}
              />

              <label style={{
                display:      'flex',
                alignItems:   'center',
                gap:          '10px',
                marginBottom: '20px',
                cursor:       'pointer',
                fontSize:     '14px',
                color:        '#64748B',
              }}>
                <input
                  type="checkbox"
                  checked={achieveForm.featured}
                  onChange={e => setAchieveForm({
                    ...achieveForm, featured: e.target.checked
                  })}
                />
                Mark as Featured
                (shows larger in gallery)
              </label>

              {uploadProgress && (
                <p style={{
                  color:        '#2563EB',
                  fontSize:     '14px',
                  marginBottom: '12px',
                  fontWeight:   '500',
                }}>
                  ⏳ {uploadProgress}
                </p>
              )}

              <button
                onClick={saveAchievement}
                disabled={saving || !achieveForm.title}
                style={{
                  ...btnStyle,
                  width:      '100%',
                  opacity:    saving ? 0.6 : 1,
                  cursor:     saving ? 'not-allowed' : 'pointer',
                }}
              >
                {saving
                  ? 'Uploading & Saving...'
                  : 'Add to Gallery 🏆'
                }
              </button>
            </div>
          )}

          {/* GUESTBOOK TAB */}
          {tab === 'messages' && (
            <div>
              <h2 style={{
                fontSize:'24px', fontWeight:'700', color:'#0A0A0A',
                fontFamily:'Clash Display, sans-serif', marginBottom:'24px'
              }}>
                Guestbook Messages ({messages.length})
              </h2>
              {messages.map(msg => (
                <div key={msg.id} style={{
                  background:   '#FFFFFF',
                  border:       '1px solid #E2E8F0',
                  borderRadius: '12px',
                  padding:      '20px',
                  marginBottom: '12px',
                  display:      'flex',
                  justifyContent:'space-between',
                  alignItems:   'flex-start',
                  gap:          '16px',
                }}>
                  <div>
                    <p style={{ fontWeight:'700', color:'#0A0A0A', marginBottom:'4px' }}>
                      {msg.name}
                    </p>
                    <p style={{ color:'#64748B', fontSize:'14px', lineHeight:'1.6' }}>
                      {msg.message}
                    </p>
                    <p style={{
                      color:'#94A3B8', fontSize:'12px', marginTop:'8px',
                      fontFamily:'JetBrains Mono, monospace'
                    }}>
                      {new Date(msg.created_at).toLocaleString('en-IN')}
                    </p>
                  </div>
                  <button onClick={() => deleteGuestbook(msg.id)} style={{
                    background:   '#FFF1F2',
                    border:       '1px solid #FECDD3',
                    borderRadius: '8px',
                    color:        '#BE123C',
                    padding:      '6px 14px',
                    fontSize:     '13px',
                    cursor:       'pointer',
                    flexShrink:   0,
                  }}>
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* CONTACTS TAB */}
          {tab === 'contacts' && (
            <div>
              <h2 style={{
                fontSize:'24px', fontWeight:'700', color:'#0A0A0A',
                fontFamily:'Clash Display, sans-serif', marginBottom:'24px'
              }}>
                Contact Messages ({contacts.length})
              </h2>
              {contacts.map(msg => (
                <div key={msg.id} style={{
                  background:   '#FFFFFF',
                  border:       '1px solid #E2E8F0',
                  borderRadius: '12px',
                  padding:      '24px',
                  marginBottom: '12px',
                }}>
                  <div style={{
                    display:'flex', justifyContent:'space-between',
                    marginBottom:'12px', flexWrap:'wrap', gap:'8px'
                  }}>
                    <div>
                      <p style={{ fontWeight:'700', color:'#0A0A0A' }}>
                        {msg.name}
                      </p>
                      <p style={{ color:'#2563EB', fontSize:'14px' }}>
                        {msg.email}
                      </p>
                    </div>
                    <p style={{
                      color:'#94A3B8', fontSize:'12px',
                      fontFamily:'JetBrains Mono, monospace'
                    }}>
                      {new Date(msg.created_at).toLocaleString('en-IN')}
                    </p>
                  </div>
                  <p style={{
                    fontWeight:'600', color:'#0A0A0A',
                    marginBottom:'8px', fontSize:'15px'
                  }}>
                    {msg.subject}
                  </p>
                  <p style={{ color:'#64748B', fontSize:'14px', lineHeight:'1.7' }}>
                    {msg.message}
                  </p>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
