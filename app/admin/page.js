'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function AdminPanel() {

  // ── Auth ──────────────────────────────────────
  const [session,  setSession]  = useState(null)
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [authError,setAuthError]= useState('')

  // ── UI State ──────────────────────────────────
  const [tab,     setTab]     = useState('lifefeed')
  const [saving,  setSaving]  = useState(false)
  const [saved,   setSaved]   = useState(false)
  const [uploadMsg,setUploadMsg]=useState('')

  // ── Data ──────────────────────────────────────
  const [messages, setMessages] = useState([])
  const [contacts, setContacts] = useState([])

  // ── Life Feed Form ────────────────────────────
  const [feedForm, setFeedForm] = useState({
    title: '', description: '',
    category: 'Community', location: ''
  })
  const [feedImg,     setFeedImg]     = useState(null)
  const [feedPreview, setFeedPreview] = useState(null)

  // ── Blog Form ─────────────────────────────────
  const [blogForm, setBlogForm] = useState({
    title: '', slug: '', excerpt: '',
    content: '', tags: ''
  })
  const [blogImg,     setBlogImg]     = useState(null)
  const [blogPreview, setBlogPreview] = useState(null)

  // ── Project Form ──────────────────────────────
  const [projectForm, setProjectForm] = useState({
    title: '', description: '', tech_stack: '',
    live_url: '', github_url: '', featured: false
  })
  const [projectImg,     setProjectImg]     = useState(null)
  const [projectPreview, setProjectPreview] = useState(null)

  // ── Achievement Form ──────────────────────────
  const [achieveForm, setAchieveForm] = useState({
    title: '', description: '', category: 'Award',
    date: '', issuer: '', featured: false
  })
  const [achieveImg,     setAchieveImg]     = useState(null)
  const [achievePreview, setAchievePreview] = useState(null)

  // ── Auth Effects ──────────────────────────────
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })
    supabase.auth.onAuthStateChange((_e, session) => {
      setSession(session)
    })
  }, [])

  useEffect(() => {
    if (session) {
      fetchMessages()
      fetchContacts()
    }
  }, [session])

  // ── Fetch Functions ───────────────────────────
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

  // ── Auth Functions ────────────────────────────
  const handleLogin = async () => {
    setAuthError('')
    const { error } = await supabase.auth
      .signInWithPassword({ email, password })
    if (error) setAuthError(error.message)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  const showSaved = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  // ── Image Upload ──────────────────────────────
  const uploadImage = async (file, folder) => {
    if (!file) return null
    const ext      = file.name.split('.').pop()
    const fileName = `${folder}/${Date.now()}.${ext}`
    setUploadMsg('Uploading image...')

    const { error } = await supabase.storage
      .from('portfolio-images')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
      })

    if (error) {
      console.error('Upload error:', error)
      setUploadMsg('Image upload failed: ' + error.message)
      return null
    }

    const { data: urlData } = supabase.storage
      .from('portfolio-images')
      .getPublicUrl(fileName)

    setUploadMsg('')
    return urlData.publicUrl
  }

  const handleImagePick = (setter, previewSetter) => (e) => {
    const file = e.target.files[0]
    if (!file) return
    setter(file)
    const reader = new FileReader()
    reader.onload = (ev) => previewSetter(ev.target.result)
    reader.readAsDataURL(file)
  }

  // ── Save Functions ────────────────────────────
  const saveFeed = async () => {
    if (!feedForm.title) return
    setSaving(true)
    const image_url = await uploadImage(feedImg, 'lifefeed')
    await supabase.from('life_feed')
      .insert([{ ...feedForm, image_url }])
    setFeedForm({
      title: '', description: '',
      category: 'Community', location: ''
    })
    setFeedImg(null)
    setFeedPreview(null)
    setSaving(false)
    showSaved()
  }

  const saveBlog = async () => {
    if (!blogForm.title || !blogForm.slug) return
    setSaving(true)
    const image_url = await uploadImage(blogImg, 'blogs')
    const payload = {
      ...blogForm,
      cover_image: image_url,
      tags: blogForm.tags
        .split(',')
        .map(t => t.trim())
        .filter(Boolean),
      published: true,
    }
    await supabase.from('blogs').insert([payload])
    setBlogForm({
      title: '', slug: '', excerpt: '',
      content: '', tags: ''
    })
    setBlogImg(null)
    setBlogPreview(null)
    setSaving(false)
    showSaved()
  }

  const saveProject = async () => {
    if (!projectForm.title) return
    setSaving(true)
    const image_url = await uploadImage(
      projectImg, 'projects'
    )
    const payload = {
      ...projectForm,
      image_url,
      tech_stack: projectForm.tech_stack
        .split(',')
        .map(t => t.trim())
        .filter(Boolean),
    }
    await supabase.from('projects').insert([payload])
    setProjectForm({
      title: '', description: '', tech_stack: '',
      live_url: '', github_url: '', featured: false
    })
    setProjectImg(null)
    setProjectPreview(null)
    setSaving(false)
    showSaved()
  }

  const saveAchievement = async () => {
    if (!achieveForm.title) return
    setSaving(true)
    const image_url = await uploadImage(
      achieveImg, 'achievements'
    )
    await supabase.from('achievements')
      .insert([{ ...achieveForm, image_url }])
    setAchieveForm({
      title: '', description: '', category: 'Award',
      date: '', issuer: '', featured: false
    })
    setAchieveImg(null)
    setAchievePreview(null)
    setSaving(false)
    showSaved()
  }

  const deleteGuestbook = async (id) => {
    await supabase.from('guestbook')
      .delete().eq('id', id)
    fetchMessages()
  }

  // ── Styles ────────────────────────────────────
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
    display:      'block',
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
    transition:  'background 0.2s',
  }

  // ── Image Upload UI Component ─────────────────
  const ImageUploader = ({
    id, preview, onPick, label = 'Click to upload image'
  }) => (
    <div
      onClick={() => document.getElementById(id).click()}
      style={{
        border:       '2px dashed #E2E8F0',
        borderRadius: '16px',
        padding:      '24px',
        textAlign:    'center',
        marginBottom: '16px',
        background:   '#F8F9FA',
        cursor:       'pointer',
        transition:   'all 0.2s',
        minHeight:    '120px',
        display:      'flex',
        alignItems:   'center',
        justifyContent:'center',
        flexDirection: 'column',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = '#2563EB'
        e.currentTarget.style.background  = '#EFF6FF'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = '#E2E8F0'
        e.currentTarget.style.background  = '#F8F9FA'
      }}
    >
      {preview ? (
        <>
          <img
            src={preview}
            alt="preview"
            style={{
              maxHeight:    '180px',
              maxWidth:     '100%',
              borderRadius: '10px',
              marginBottom: '10px',
              objectFit:    'cover',
            }}
          />
          <p style={{
            color:     '#2563EB',
            fontSize:  '12px',
            fontWeight:'600',
            margin:    0,
          }}>
            ✅ Image selected — click to change
          </p>
        </>
      ) : (
        <>
          <div style={{
            fontSize:     '36px',
            marginBottom: '8px',
          }}>
            📸
          </div>
          <p style={{
            color:    '#64748B',
            fontSize: '14px',
            margin:   '0 0 4px',
            fontWeight:'500',
          }}>
            {label}
          </p>
          <p style={{
            color:   '#94A3B8',
            fontSize:'12px',
            margin:  0,
          }}>
            JPG, PNG, WEBP — Max 5MB
          </p>
        </>
      )}
      <input
        id={id}
        type="file"
        accept="image/*"
        onChange={onPick}
        style={{ display: 'none' }}
      />
    </div>
  )

  // ── Section Header Component ──────────────────
  const SectionHeader = ({ title, subtitle }) => (
    <div style={{ marginBottom: '28px' }}>
      <h2 style={{
        fontSize:   '24px',
        fontWeight: '700',
        color:      '#0A0A0A',
        fontFamily: 'Clash Display, sans-serif',
        margin:     '0 0 6px',
      }}>
        {title}
      </h2>
      {subtitle && (
        <p style={{
          fontSize: '14px',
          color:    '#64748B',
          margin:   0,
        }}>
          {subtitle}
        </p>
      )}
    </div>
  )

  // ── Login Screen ──────────────────────────────
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
          <span style={{ color: '#2563EB' }}>.</span>
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
          onFocus={e => e.target.style.borderColor='#2563EB'}
          onBlur={e  => e.target.style.borderColor='#E2E8F0'}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={inputStyle}
          onFocus={e => e.target.style.borderColor='#2563EB'}
          onBlur={e  => e.target.style.borderColor='#E2E8F0'}
        />
        {authError && (
          <p style={{
            color:        '#DC2626',
            fontSize:     '14px',
            marginBottom: '12px',
          }}>
            {authError}
          </p>
        )}
        <button
          onClick={handleLogin}
          style={{ ...btnStyle, width: '100%' }}
          onMouseEnter={e =>
            e.target.style.background='#2563EB'
          }
          onMouseLeave={e =>
            e.target.style.background='#0A0A0A'
          }
        >
          Login →
        </button>
      </div>
    </div>
  )

  // ── Dashboard ─────────────────────────────────
  const TABS = [
    { id: 'lifefeed',     label: '📸 Life Feed'    },
    { id: 'blog',         label: '✍️  Blog'         },
    { id: 'projects',     label: '💻 Projects'     },
    { id: 'achievements', label: '🏆 Achievements' },
    { id: 'messages',     label: '💬 Guestbook'    },
    { id: 'contacts',     label: '📧 Contacts'     },
  ]

  return (
    <div style={{ minHeight:'100vh', background:'#F8F9FA' }}>

      {/* Top Bar */}
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
          margin:     0,
        }}>
          Admin Panel
          <span style={{ color:'#2563EB' }}>.</span>
        </h1>
        <div style={{
          display:    'flex',
          gap:        '12px',
          alignItems: 'center',
        }}>
          {saved && (
            <span style={{
              color:     '#166534',
              fontSize:  '14px',
              fontWeight:'500',
            }}>
              ✅ Saved successfully!
            </span>
          )}
          {uploadMsg && (
            <span style={{
              color:     '#2563EB',
              fontSize:  '14px',
              fontWeight:'500',
            }}>
              ⏳ {uploadMsg}
            </span>
          )}
          <a href="/" style={{
            color:          '#64748B',
            fontSize:       '14px',
            textDecoration: 'none',
          }}>
            View Site →
          </a>
          <button
            onClick={handleLogout}
            style={{
              background:   'transparent',
              border:       '1px solid #E2E8F0',
              borderRadius: '8px',
              padding:      '8px 16px',
              fontSize:     '14px',
              cursor:       'pointer',
              color:        '#64748B',
            }}
          >
            Logout
          </button>
        </div>
      </div>

      <div style={{ display:'flex', minHeight:'calc(100vh - 65px)' }}>

        {/* Sidebar */}
        <div style={{
          width:       '220px',
          background:  '#FFFFFF',
          borderRight: '1px solid #E2E8F0',
          padding:     '24px 12px',
          flexShrink:  0,
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
                background:  tab===t.id ? '#EFF6FF' : 'transparent',
                color:       tab===t.id ? '#2563EB'  : '#64748B',
                fontWeight:  tab===t.id ? '600'      : '400',
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

        {/* Main Content */}
        <div style={{ flex:1, padding:'40px', overflowY:'auto' }}>

          {/* ── LIFE FEED TAB ── */}
          {tab === 'lifefeed' && (
            <div style={{ maxWidth:'600px' }}>
              <SectionHeader
                title="Post to Life Feed"
                subtitle="Share your daily activities, travels and community moments"
              />
              <ImageUploader
                id="feed-img"
                preview={feedPreview}
                onPick={handleImagePick(
                  setFeedImg, setFeedPreview
                )}
                label="Upload a photo for this moment"
              />
              <input
                placeholder="Title * e.g. Visited local school for coding workshop"
                value={feedForm.title}
                onChange={e => setFeedForm({
                  ...feedForm, title: e.target.value
                })}
                style={inputStyle}
                onFocus={e=>e.target.style.borderColor='#2563EB'}
                onBlur={e =>e.target.style.borderColor='#E2E8F0'}
              />
              <textarea
                placeholder="Description — tell the story behind this moment"
                value={feedForm.description}
                onChange={e => setFeedForm({
                  ...feedForm, description: e.target.value
                })}
                rows={3}
                style={{ ...inputStyle, resize:'vertical' }}
                onFocus={e=>e.target.style.borderColor='#2563EB'}
                onBlur={e =>e.target.style.borderColor='#E2E8F0'}
              />
              <select
                value={feedForm.category}
                onChange={e => setFeedForm({
                  ...feedForm, category: e.target.value
                })}
                style={inputStyle}
              >
                {['Travel','Community','Learning',
                  'Event','Personal'].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <input
                placeholder="Location e.g. Ahmedabad, Gujarat"
                value={feedForm.location}
                onChange={e => setFeedForm({
                  ...feedForm, location: e.target.value
                })}
                style={inputStyle}
                onFocus={e=>e.target.style.borderColor='#2563EB'}
                onBlur={e =>e.target.style.borderColor='#E2E8F0'}
              />
              <button
                onClick={saveFeed}
                disabled={saving || !feedForm.title}
                style={{
                  ...btnStyle,
                  opacity: saving ? 0.6 : 1,
                  cursor:  saving ? 'not-allowed' : 'pointer',
                }}
                onMouseEnter={e => {
                  if (!saving)
                    e.target.style.background='#2563EB'
                }}
                onMouseLeave={e => {
                  if (!saving)
                    e.target.style.background='#0A0A0A'
                }}
              >
                {saving ? 'Posting...' : 'Post to Life Feed ✨'}
              </button>
            </div>
          )}

          {/* ── BLOG TAB ── */}
          {tab === 'blog' && (
            <div style={{ maxWidth:'700px' }}>
              <SectionHeader
                title="Write Blog Post"
                subtitle="Share your knowledge, experiences and thoughts"
              />
              <ImageUploader
                id="blog-img"
                preview={blogPreview}
                onPick={handleImagePick(
                  setBlogImg, setBlogPreview
                )}
                label="Upload cover image for this post"
              />
              <input
                placeholder="Title *"
                value={blogForm.title}
                onChange={e => setBlogForm({
                  ...blogForm, title: e.target.value
                })}
                style={inputStyle}
                onFocus={e=>e.target.style.borderColor='#2563EB'}
                onBlur={e =>e.target.style.borderColor='#E2E8F0'}
              />
              <input
                placeholder="Slug * e.g. my-first-post"
                value={blogForm.slug}
                onChange={e => setBlogForm({
                  ...blogForm,
                  slug: e.target.value
                    .toLowerCase()
                    .replace(/\s+/g,'-')
                    .replace(/[^a-z0-9-]/g,'')
                })}
                style={inputStyle}
                onFocus={e=>e.target.style.borderColor='#2563EB'}
                onBlur={e =>e.target.style.borderColor='#E2E8F0'}
              />
              <input
                placeholder="Excerpt — short description shown on blog list"
                value={blogForm.excerpt}
                onChange={e => setBlogForm({
                  ...blogForm, excerpt: e.target.value
                })}
                style={inputStyle}
                onFocus={e=>e.target.style.borderColor='#2563EB'}
                onBlur={e =>e.target.style.borderColor='#E2E8F0'}
              />
              <textarea
                placeholder="Full blog content *"
                value={blogForm.content}
                onChange={e => setBlogForm({
                  ...blogForm, content: e.target.value
                })}
                rows={14}
                style={{ ...inputStyle, resize:'vertical' }}
                onFocus={e=>e.target.style.borderColor='#2563EB'}
                onBlur={e =>e.target.style.borderColor='#E2E8F0'}
              />
              <input
                placeholder="Tags — comma separated e.g. React, Career, AI"
                value={blogForm.tags}
                onChange={e => setBlogForm({
                  ...blogForm, tags: e.target.value
                })}
                style={inputStyle}
                onFocus={e=>e.target.style.borderColor='#2563EB'}
                onBlur={e =>e.target.style.borderColor='#E2E8F0'}
              />
              <button
                onClick={saveBlog}
                disabled={saving||!blogForm.title||!blogForm.slug}
                style={{
                  ...btnStyle,
                  opacity: saving ? 0.6 : 1,
                  cursor:  saving ? 'not-allowed' : 'pointer',
                }}
                onMouseEnter={e => {
                  if (!saving)
                    e.target.style.background='#2563EB'
                }}
                onMouseLeave={e => {
                  if (!saving)
                    e.target.style.background='#0A0A0A'
                }}
              >
                {saving ? 'Publishing...' : 'Publish Blog Post →'}
              </button>
            </div>
          )}

          {/* ── PROJECTS TAB ── */}
          {tab === 'projects' && (
            <div style={{ maxWidth:'600px' }}>
              <SectionHeader
                title="Add New Project"
                subtitle="Showcase your best work with details and links"
              />
              <ImageUploader
                id="project-img"
                preview={projectPreview}
                onPick={handleImagePick(
                  setProjectImg, setProjectPreview
                )}
                label="Upload project screenshot or preview"
              />
              <input
                placeholder="Project Title *"
                value={projectForm.title}
                onChange={e => setProjectForm({
                  ...projectForm, title: e.target.value
                })}
                style={inputStyle}
                onFocus={e=>e.target.style.borderColor='#2563EB'}
                onBlur={e =>e.target.style.borderColor='#E2E8F0'}
              />
              <textarea
                placeholder="Description — what does this project do?"
                value={projectForm.description}
                onChange={e => setProjectForm({
                  ...projectForm, description: e.target.value
                })}
                rows={3}
                style={{ ...inputStyle, resize:'vertical' }}
                onFocus={e=>e.target.style.borderColor='#2563EB'}
                onBlur={e =>e.target.style.borderColor='#E2E8F0'}
              />
              <input
                placeholder="Tech Stack — comma separated e.g. React, Node.js, MongoDB"
                value={projectForm.tech_stack}
                onChange={e => setProjectForm({
                  ...projectForm, tech_stack: e.target.value
                })}
                style={inputStyle}
                onFocus={e=>e.target.style.borderColor='#2563EB'}
                onBlur={e =>e.target.style.borderColor='#E2E8F0'}
              />
              <input
                placeholder="Live URL e.g. https://myproject.vercel.app"
                value={projectForm.live_url}
                onChange={e => setProjectForm({
                  ...projectForm, live_url: e.target.value
                })}
                style={inputStyle}
                onFocus={e=>e.target.style.borderColor='#2563EB'}
                onBlur={e =>e.target.style.borderColor='#E2E8F0'}
              />
              <input
                placeholder="GitHub URL e.g. https://github.com/you/repo"
                value={projectForm.github_url}
                onChange={e => setProjectForm({
                  ...projectForm, github_url: e.target.value
                })}
                style={inputStyle}
                onFocus={e=>e.target.style.borderColor='#2563EB'}
                onBlur={e =>e.target.style.borderColor='#E2E8F0'}
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
                    ...projectForm,
                    featured: e.target.checked
                  })}
                />
                Mark as Featured Project
              </label>
              <button
                onClick={saveProject}
                disabled={saving || !projectForm.title}
                style={{
                  ...btnStyle,
                  opacity: saving ? 0.6 : 1,
                  cursor:  saving ? 'not-allowed' : 'pointer',
                }}
                onMouseEnter={e => {
                  if (!saving)
                    e.target.style.background='#2563EB'
                }}
                onMouseLeave={e => {
                  if (!saving)
                    e.target.style.background='#0A0A0A'
                }}
              >
                {saving ? 'Saving...' : 'Add Project →'}
              </button>
            </div>
          )}

          {/* ── ACHIEVEMENTS TAB ── */}
          {tab === 'achievements' && (
            <div style={{ maxWidth:'600px' }}>
              <SectionHeader
                title="Add Achievement"
                subtitle="Awards, certificates, community moments and more"
              />
              <ImageUploader
                id="achieve-img"
                preview={achievePreview}
                onPick={handleImagePick(
                  setAchieveImg, setAchievePreview
                )}
                label="Upload photo of your achievement"
              />
              <input
                placeholder="Title * e.g. Gold Medal — Academic Excellence"
                value={achieveForm.title}
                onChange={e => setAchieveForm({
                  ...achieveForm, title: e.target.value
                })}
                style={inputStyle}
                onFocus={e=>e.target.style.borderColor='#2563EB'}
                onBlur={e =>e.target.style.borderColor='#E2E8F0'}
              />
              <textarea
                placeholder="Description — tell the story of this achievement"
                value={achieveForm.description}
                onChange={e => setAchieveForm({
                  ...achieveForm, description: e.target.value
                })}
                rows={3}
                style={{ ...inputStyle, resize:'vertical' }}
                onFocus={e=>e.target.style.borderColor='#2563EB'}
                onBlur={e =>e.target.style.borderColor='#E2E8F0'}
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
                placeholder="Issuer e.g. Ganpat University"
                value={achieveForm.issuer}
                onChange={e => setAchieveForm({
                  ...achieveForm, issuer: e.target.value
                })}
                style={inputStyle}
                onFocus={e=>e.target.style.borderColor='#2563EB'}
                onBlur={e =>e.target.style.borderColor='#E2E8F0'}
              />
              <input
                placeholder="Date e.g. March 2024"
                value={achieveForm.date}
                onChange={e => setAchieveForm({
                  ...achieveForm, date: e.target.value
                })}
                style={inputStyle}
                onFocus={e=>e.target.style.borderColor='#2563EB'}
                onBlur={e =>e.target.style.borderColor='#E2E8F0'}
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
                    ...achieveForm,
                    featured: e.target.checked
                  })}
                />
                Mark as Featured
                (shows larger in gallery)
              </label>
              <button
                onClick={saveAchievement}
                disabled={saving || !achieveForm.title}
                style={{
                  ...btnStyle,
                  opacity: saving ? 0.6 : 1,
                  cursor:  saving ? 'not-allowed' : 'pointer',
                }}
                onMouseEnter={e => {
                  if (!saving)
                    e.target.style.background='#2563EB'
                }}
                onMouseLeave={e => {
                  if (!saving)
                    e.target.style.background='#0A0A0A'
                }}
              >
                {saving
                  ? 'Uploading & Saving...'
                  : 'Add to Gallery 🏆'
                }
              </button>
            </div>
          )}

          {/* ── GUESTBOOK TAB ── */}
          {tab === 'messages' && (
            <div>
              <SectionHeader
                title={`Guestbook Messages (${messages.length})`}
                subtitle="Messages left by visitors on your portfolio"
              />
              {messages.length === 0 ? (
                <p style={{ color:'#64748B' }}>
                  No messages yet.
                </p>
              ) : messages.map(msg => (
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
                    <p style={{
                      fontWeight:   '700',
                      color:        '#0A0A0A',
                      marginBottom: '4px',
                    }}>
                      {msg.name}
                    </p>
                    <p style={{
                      color:      '#64748B',
                      fontSize:   '14px',
                      lineHeight: '1.6',
                    }}>
                      {msg.message}
                    </p>
                    <p style={{
                      color:      '#94A3B8',
                      fontSize:   '12px',
                      marginTop:  '8px',
                      fontFamily: 'JetBrains Mono, monospace',
                    }}>
                      {new Date(msg.created_at)
                        .toLocaleString('en-IN')}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteGuestbook(msg.id)}
                    style={{
                      background:   '#FFF1F2',
                      border:       '1px solid #FECDD3',
                      borderRadius: '8px',
                      color:        '#BE123C',
                      padding:      '6px 14px',
                      fontSize:     '13px',
                      cursor:       'pointer',
                      flexShrink:   0,
                    }}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* ── CONTACTS TAB ── */}
          {tab === 'contacts' && (
            <div>
              <SectionHeader
                title={`Contact Messages (${contacts.length})`}
                subtitle="Messages submitted through your contact form"
              />
              {contacts.length === 0 ? (
                <p style={{ color:'#64748B' }}>
                  No messages yet.
                </p>
              ) : contacts.map(msg => (
                <div key={msg.id} style={{
                  background:   '#FFFFFF',
                  border:       '1px solid #E2E8F0',
                  borderRadius: '12px',
                  padding:      '24px',
                  marginBottom: '12px',
                }}>
                  <div style={{
                    display:        'flex',
                    justifyContent: 'space-between',
                    marginBottom:   '12px',
                    flexWrap:       'wrap',
                    gap:            '8px',
                  }}>
                    <div>
                      <p style={{
                        fontWeight:   '700',
                        color:        '#0A0A0A',
                        marginBottom: '2px',
                      }}>
                        {msg.name}
                      </p>
                      <p style={{
                        color:    '#2563EB',
                        fontSize: '14px',
                        margin:   0,
                      }}>
                        {msg.email}
                      </p>
                    </div>
                    <p style={{
                      color:      '#94A3B8',
                      fontSize:   '12px',
                      fontFamily: 'JetBrains Mono, monospace',
                    }}>
                      {new Date(msg.created_at)
                        .toLocaleString('en-IN')}
                    </p>
                  </div>
                  <p style={{
                    fontWeight:   '600',
                    color:        '#0A0A0A',
                    marginBottom: '8px',
                    fontSize:     '15px',
                  }}>
                    {msg.subject}
                  </p>
                  <p style={{
                    color:      '#64748B',
                    fontSize:   '14px',
                    lineHeight: '1.7',
                    margin:     0,
                  }}>
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
