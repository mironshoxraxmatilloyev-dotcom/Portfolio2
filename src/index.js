import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Plus, Edit2, Trash2, Save, LogOut, User, Briefcase, FileText, Mail, Settings, Eye, Code, ExternalLink, Calendar, Tag } from 'lucide-react';
import ReactDOM from 'react-dom/client';
import './index.css';

export default function PortfolioAdminPanel() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [adminPage, setAdminPage] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [adminSidebarOpen, setAdminSidebarOpen] = useState(false);
  
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  
  const [projects, setProjects] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [profile, setProfile] = useState({
    name: 'Mironshox Raxmatilloyev',
    title: 'Full Stack Developer',
    bio: 'Professional web developer specializing in React, Node.js, and MongoDB',
    email: 'mironshox@example.com',
    phone: '+998 90 123 45 67',
    location: 'Tashkent, Uzbekistan',
    skills: ['React', 'Node.js', 'MongoDB', 'Express', 'TypeScript', 'Tailwind CSS']
  });

  const [editingProject, setEditingProject] = useState(null);
  const [editingBlog, setEditingBlog] = useState(null);
  const [editingProfile, setEditingProfile] = useState(false);
  const [contact, setContact] = useState({ name: '', email: '', message: '' });
  const [adminCreds, setAdminCreds] = useState({ username: 'Mironshox_adminX', password: 'Mir0n$h0x!@2025' });
  const [showCredsModal, setShowCredsModal] = useState(false);
  const [credsDraft, setCredsDraft] = useState({ username: 'Mironshox_adminX', password: 'Mir0n$h0x!@2025' });
  const [toast, setToast] = useState({ visible: false, text: '', type: 'success' });
  const [secretClicks, setSecretClicks] = useState(0);
  const secretTimer = useRef(null);

  const triggerToast = (text, type = 'success') => {
    setToast({ visible: true, text, type });
    window.clearTimeout(triggerToast._t);
    triggerToast._t = window.setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 3000);
  };

  useEffect(() => {
    const savedProjects = localStorage.getItem('portfolio_projects');
    const savedBlogs = localStorage.getItem('portfolio_blogs');
    const savedProfile = localStorage.getItem('portfolio_profile');
    const savedCreds = localStorage.getItem('admin_credentials');
    
    if (savedProjects) setProjects(JSON.parse(savedProjects));
    else {
      const defaultProjects = [
        {
          id: 1,
          title: 'E-commerce Platform',
          description: 'Full-stack online shopping platform with payment integration',
          image: 'keys/ecommerce-project?prompt=modern%20ecommerce%20website%20dashboard%20interface%20clean%20design',
          technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
          github: 'https://github.com',
          demo: 'https://demo.com',
          category: 'Web Development',
          date: '2024-10-15'
        },
        {
          id: 2,
          title: 'Task Management App',
          description: 'Collaborative project management tool with real-time updates',
          image: 'keys/task-app-project?prompt=task%20management%20application%20modern%20ui%20dashboard',
          technologies: ['React', 'Firebase', 'Tailwind CSS'],
          github: 'https://github.com',
          demo: 'https://demo.com',
          category: 'Web App',
          date: '2024-09-20'
        },
        {
          id: 3,
          title: 'Portfolio CMS',
          description: 'Content management system for portfolio websites',
          image: 'keys/cms-project?prompt=content%20management%20system%20modern%20admin%20interface',
          technologies: ['Next.js', 'MongoDB', 'Express'],
          github: 'https://github.com',
          demo: 'https://demo.com',
          category: 'CMS',
          date: '2024-08-10'
        }
      ];
      setProjects(defaultProjects);
      localStorage.setItem('portfolio_projects', JSON.stringify(defaultProjects));
    }
    
    if (savedBlogs) setBlogs(JSON.parse(savedBlogs));
    else {
      const defaultBlogs = [
        {
          id: 1,
          title: 'Getting Started with React Hooks',
          excerpt: 'Learn how to use React Hooks effectively in your projects',
          content: 'React Hooks have revolutionized the way we write React components...',
          image: 'keys/react-hooks-blog?prompt=react%20hooks%20programming%20code%20illustration',
          tags: ['React', 'JavaScript', 'Tutorial'],
          date: '2024-10-10',
          author: 'Mironshox Raxmatilloyev'
        },
        {
          id: 2,
          title: 'MongoDB Best Practices',
          excerpt: 'Essential tips for working with MongoDB in production',
          content: 'MongoDB is a powerful NoSQL database that requires careful consideration...',
          image: 'keys/mongodb-blog?prompt=mongodb%20database%20technology%20illustration',
          tags: ['MongoDB', 'Database', 'Backend'],
          date: '2024-09-25',
          author: 'Mironshox Raxmatilloyev'
        }
      ];
      setBlogs(defaultBlogs);
      localStorage.setItem('portfolio_blogs', JSON.stringify(defaultBlogs));
    }
    
    if (savedProfile) setProfile(JSON.parse(savedProfile));
    if (savedCreds) setAdminCreds(JSON.parse(savedCreds));
  }, []);

  const saveProjects = (newProjects) => {
    setProjects(newProjects);
    localStorage.setItem('portfolio_projects', JSON.stringify(newProjects));
  };

  const saveBlogs = (newBlogs) => {
    setBlogs(newBlogs);
    localStorage.setItem('portfolio_blogs', JSON.stringify(newBlogs));
  };

  const saveProfile = (newProfile) => {
    setProfile(newProfile);
    localStorage.setItem('portfolio_profile', JSON.stringify(newProfile));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginData.username === adminCreds.username && loginData.password === adminCreds.password) {
      setIsAdmin(true);
      setShowLogin(false);
      setCurrentPage('admin');
      setLoginData({ username: '', password: '' });
    } else {
      alert('Noto\'g\'ri login yoki parol');
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setCurrentPage('home');
    setAdminPage('dashboard');
  };

  const handleSaveCreds = () => {
    if (!credsDraft.username || !credsDraft.password) return;
    setAdminCreds(credsDraft);
    localStorage.setItem('admin_credentials', JSON.stringify(credsDraft));
    setShowCredsModal(false);
  };

  const handleSecretClick = () => {
    if (secretTimer.current) {
      clearTimeout(secretTimer.current);
    }
    setSecretClicks((c) => {
      const next = c + 1;
      if (next >= 5) {
        setCredsDraft(adminCreds);
        setShowCredsModal(true);
        return 0;
      }
      secretTimer.current = setTimeout(() => setSecretClicks(0), 3000);
      return next;
    });
  };

  const handleAddProject = () => {
    setEditingProject({
      id: Date.now(),
      title: '',
      description: '',
      image: '',
      technologies: [],
      github: '',
      demo: '',
      category: '',
      date: new Date().toISOString().split('T')[0]
    });
  };

  const handleSaveProject = () => {
    if (editingProject.title && editingProject.description) {
      const existingIndex = projects.findIndex(p => p.id === editingProject.id);
      if (existingIndex >= 0) {
        const updated = [...projects];
        updated[existingIndex] = editingProject;
        saveProjects(updated);
      } else {
        saveProjects([...projects, editingProject]);
      }
      setEditingProject(null);
    }
  };

  const handleDeleteProject = (id) => {
    if (window.confirm("Loyihani o'chirishni xohlaysizmi?")) {
      saveProjects(projects.filter(p => p.id !== id));
    }
  };

  const handleAddBlog = () => {
    setEditingBlog({
      id: Date.now(),
      title: '',
      excerpt: '',
      content: '',
      image: '',
      tags: [],
      date: new Date().toISOString().split('T')[0],
      author: profile.name
    });
  };

  const handleSaveBlog = () => {
    if (editingBlog.title && editingBlog.content) {
      const existingIndex = blogs.findIndex(b => b.id === editingBlog.id);
      if (existingIndex >= 0) {
        const updated = [...blogs];
        updated[existingIndex] = editingBlog;
        saveBlogs(updated);
      } else {
        saveBlogs([...blogs, editingBlog]);
      }
      setEditingBlog(null);
    }
  };

  const handleDeleteBlog = (id) => {
    if (window.confirm("Maqolani o'chirishni xohlaysizmi?")) {
      saveBlogs(blogs.filter(b => b.id !== id));
    }
  };

  const handleSaveProfile = () => {
    saveProfile(profile);
    setEditingProfile(false);
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    try {
      const BOT_TOKEN = '8071197868:AAEdhOigTc68jw4IqNuIbQNgEnhOGpstCDg';
      const chatId = '6583620160';

      const text = [
        'Yangi aloqa xabari:',
        `Ism: ${contact.name}`,
        `Email: ${contact.email}`,
        `Xabar: ${contact.message}`,
        `Sana: ${new Date().toLocaleString()}`
      ].join('\n');

      const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text })
      });

      if (!res.ok) throw new Error('Telegram API error');
      triggerToast("Xabaringiz adminga yuborildi", 'success');
      setContact({ name: '', email: '', message: '' });
    } catch (err) {
      triggerToast("Xabar yuborishda xatolik. Iltimos, keyinroq urinib ko'ring.", 'error');
      console.error(err);
    }
  };

  // Media helper functions for Blog previews
  const isVideoUrl = (url) => {
    if (!url) return false;
    const u = url.toLowerCase();
    return /\.(mp4|webm|ogg)(\?.*)?$/.test(u) || u.includes('youtube.com') || u.includes('youtu.be') || u.includes('vimeo.com');
  };

  const toYouTubeEmbed = (url) => {
    if (!url) return null;
    try {
      if (url.includes('youtube.com/watch')) {
        const v = new URL(url).searchParams.get('v');
        return v ? `https://www.youtube.com/embed/${v}` : null;
      }
      if (url.includes('youtu.be/')) {
        const id = url.split('youtu.be/')[1]?.split(/[?&#]/)[0];
        return id ? `https://www.youtube.com/embed/${id}` : null;
      }
    } catch {}
    return null;
  };

  const toVimeoEmbed = (url) => {
    if (!url || !url.includes('vimeo.com')) return null;
    const id = url.split('vimeo.com/')[1]?.split(/[?&#]/)[0];
    return id ? `https://player.vimeo.com/video/${id}` : null;
  };

  if (currentPage === 'admin' && isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex">
          <aside className="hidden lg:block w-64 bg-gray-900 text-white min-h-screen p-6">
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-2">Admin Panel</h2>
              <p className="text-sm text-gray-400">{profile.name}</p>
            </div>
            
            <nav className="space-y-2">
              <button
                onClick={() => setAdminPage('dashboard')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  adminPage === 'dashboard' ? 'bg-blue-600' : 'hover:bg-gray-800'
                }`}
              >
                <Settings className="w-5 h-5" />
                Dashboard
              </button>
              <button
                onClick={() => setAdminPage('projects')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  adminPage === 'projects' ? 'bg-blue-600' : 'hover:bg-gray-800'
                }`}
              >
                <Briefcase className="w-5 h-5" />
                Loyihalar
              </button>
              <button
                onClick={() => setAdminPage('blogs')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  adminPage === 'blogs' ? 'bg-blue-600' : 'hover:bg-gray-800'
                }`}
              >
                <FileText className="w-5 h-5" />
                Blog
              </button>
              <button
                onClick={() => setAdminPage('profile')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  adminPage === 'profile' ? 'bg-blue-600' : 'hover:bg-gray-800'
                }`}
              >
                <User className="w-5 h-5" />
                Profil
              </button>
              <button
                onClick={() => setCurrentPage('home')}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition"
              >
                <Eye className="w-5 h-5" />
                Saytni ko'rish
              </button>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-600 transition mt-8"
              >
                <LogOut className="w-5 h-5" />
                Chiqish
              </button>
            </nav>
          </aside>

          {/* Mobile admin topbar with hamburger */}
          <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-gray-900 text-white px-4 py-3 flex items-center justify-between">
            <div className="font-semibold text-white">Admin Panel</div>
            <button
              onClick={() => setAdminSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-white/10"
              aria-label="Open admin menu"
            >
              <Menu className="w-6 h-6 text-white" />
            </button>
          </div>
          {/* Mobile overlay drawer */}
          {adminSidebarOpen && (
            <div className="lg:hidden fixed inset-0 z-50">
              <div className="absolute inset-0 bg-black/50" onClick={() => setAdminSidebarOpen(false)} />
              <div className="relative w-72 max-w-[85%] h-full bg-gray-900 text-white p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="text-lg font-bold">Admin Panel</div>
                  <button className="p-2 hover:bg-white/10 rounded-lg" onClick={() => setAdminSidebarOpen(false)}>
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <nav className="space-y-2">
                  <button onClick={() => { setAdminPage('dashboard'); setAdminSidebarOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${adminPage === 'dashboard' ? 'bg-blue-600' : 'hover:bg-gray-800'}`}>
                    <Settings className="w-5 h-5" />Dashboard
                  </button>
                  <button onClick={() => { setAdminPage('projects'); setAdminSidebarOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${adminPage === 'projects' ? 'bg-blue-600' : 'hover:bg-gray-800'}`}>
                    <Briefcase className="w-5 h-5" />Loyihalar
                  </button>
                  <button onClick={() => { setAdminPage('blogs'); setAdminSidebarOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${adminPage === 'blogs' ? 'bg-blue-600' : 'hover:bg-gray-800'}`}>
                    <FileText className="w-5 h-5" />Blog
                  </button>
                  <button onClick={() => { setAdminPage('profile'); setAdminSidebarOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${adminPage === 'profile' ? 'bg-blue-600' : 'hover:bg-gray-800'}`}>
                    <User className="w-5 h-5" />Profil
                  </button>
                  <button onClick={() => { setCurrentPage('home'); setAdminSidebarOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition">
                    <Eye className="w-5 h-5" />Saytni ko'rish
                  </button>
                  <button onClick={() => { handleLogout(); setAdminSidebarOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-600 transition mt-8">
                    <LogOut className="w-5 h-5" />Chiqish
                  </button>
                </nav>
              </div>
            </div>
          )}
          <main className="flex-1 p-8 lg:pt-8 pt-16">
            {adminPage === 'dashboard' && (
              <div className="relative group">
                <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
                <button
                  aria-label="hidden-settings"
                  onClick={handleSecretClick}
                  className="absolute top-0 right-0 w-8 h-8 rounded-full flex items-center justify-center 
                             opacity-10 group-hover:opacity-60 hover:opacity-100 focus:opacity-100 
                             hover:bg-gray-200/70 active:bg-gray-300/80 transition 
                             ring-0 focus:ring-2 focus:ring-gray-300"
                  title="Sozlamalar"
                >
                  <Settings className="w-4 h-4 text-gray-700" />
                </button>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <Briefcase className="w-8 h-8 text-blue-600" />
                      <span className="text-3xl font-bold">{projects.length}</span>
                    </div>
                    <p className="text-gray-600">Loyihalar</p>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <FileText className="w-8 h-8 text-green-600" />
                      <span className="text-3xl font-bold">{blogs.length}</span>
                    </div>
                    <p className="text-gray-600">Blog maqolalari</p>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <Tag className="w-8 h-8 text-purple-600" />
                      <span className="text-3xl font-bold">{profile.skills.length}</span>
                    </div>
                    <p className="text-gray-600">Texnologiyalar</p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h2 className="text-xl font-bold mb-4">Tezkor havolalar</h2>
                  <div className="grid grid-cols-2 gap-4 max-[600px]:grid-cols-1">
                    <button
                      onClick={() => { setAdminPage('projects'); handleAddProject(); }}
                      className="flex items-center gap-3 p-4 max-[600px]:py-6 max-[600px]:text-lg max-[600px]:w-full border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition"
                    >
                      <Plus className="w-6 h-6" />
                      <span>Yangi loyiha qo'shish</span>
                    </button>
                    <button
                      onClick={() => { setAdminPage('blogs'); handleAddBlog(); }}
                      className="flex items-center gap-3 p-4 max-[600px]:py-6 max-[600px]:text-lg max-[600px]:w-full border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition"
                    >
                      <Plus className="w-6 h-6" />
                      <span>Yangi maqola yozish</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {adminPage === 'projects' && (
              <div>
                <div className="flex items-center justify-between mb-8 max-[700px]:justify-start max-[700px]:gap-3">
                  <h1 className="text-3xl font-bold">Loyihalar</h1>
                  <button
                    onClick={handleAddProject}
                    className="flex items-center gap-2 px-6 py-3 mt-2 max-[700px]:px-4 max-[700px]:py-2 max-[700px]:text-sm max-[700px]:mt-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    <Plus className="w-5 h-5" />
                    Yangi loyiha
                  </button>
                </div>

                {editingProject && (
                  <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
                    <h2 className="text-xl font-bold mb-4">
                      {editingProject.title ? 'Loyihani tahrirlash' : 'Yangi loyiha'}
                    </h2>
                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="Loyiha nomi"
                        value={editingProject.title}
                        onChange={(e) => setEditingProject({...editingProject, title: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <textarea
                        placeholder="Tavsif"
                        value={editingProject.description}
                        onChange={(e) => setEditingProject({...editingProject, description: e.target.value})}
                        rows="4"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files && e.target.files[0];
                          if (!file) return;
                          const reader = new FileReader();
                          reader.onload = () => setEditingProject({...editingProject, image: reader.result});
                          reader.readAsDataURL(file);
                        }}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg cursor-pointer"
                      />
                      {editingProject.image && (
                        <div className="mt-2">
                          <img
                            src={editingProject.image}
                            alt="Preview"
                            className="w-full h-48 object-cover rounded-lg border"
                            onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/800x400?text=Preview'; }}
                          />
                        </div>
                      )}
                      <input
                        type="text"
                        placeholder="Texnologiyalar (vergul bilan ajratilgan)"
                        value={editingProject.technologies.join(', ')}
                        onChange={(e) => setEditingProject({...editingProject, technologies: e.target.value.split(',').map(t => t.trim())})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="GitHub URL"
                          value={editingProject.github}
                          onChange={(e) => setEditingProject({...editingProject, github: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <input
                          type="text"
                          placeholder="Demo URL"
                          value={editingProject.demo}
                          onChange={(e) => setEditingProject({...editingProject, demo: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div className="flex gap-4">
                        <button
                          onClick={handleSaveProject}
                          className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                        >
                          <Save className="w-5 h-5" />
                          Saqlash
                        </button>
                        <button
                          onClick={() => setEditingProject(null)}
                          className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                        >
                          Bekor qilish
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {projects.map(project => (
                    <div key={project.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                      <img 
                        src={project.image || 'https://via.placeholder.com/800x400?text=Image'}
                        onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/800x400?text=Image'; }} 
                        alt={project.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                        <p className="text-gray-600 mb-4">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.map((tech, i) => (
                            <span key={i} className="px-3 py-1 bg-blue-100 text-blue-600 text-sm rounded-full">
                              {tech}
                            </span>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setEditingProject(project)}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                          >
                            <Edit2 className="w-4 h-4" />
                            Tahrirlash
                          </button>
                          <button
                            onClick={() => handleDeleteProject(project.id)}
                            className="flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

{adminPage === 'blogs' && (
  <div>
    <div className="flex items-center justify-between mb-8 max-[550px]:justify-start max-[550px]:gap-1">
      <h1 className="text-3xl font-bold ml-0 max-[480px]:text-xl">Blog maqolalari</h1>
      <button
        onClick={handleAddBlog}
        className="flex items-center gap-2 px-5 py-2.5 mt-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition max-[550px]:mt-2 max-[550px]:ml-[5px] max-[480px]:px-4 max-[480px]:py-2 max-[480px]:text-xs"
      >
        <Plus className="w-4 h-4" />
        Yangi maqola
      </button>
    </div>

    {editingBlog && (
      <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
        <h2 className="text-xl font-bold mb-4">
          {editingBlog.title ? 'Maqolani tahrirlash' : 'Yangi maqola'}
        </h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Maqola sarlavhasi"
            value={editingBlog.title}
            onChange={(e) => setEditingBlog({...editingBlog, title: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <textarea
            placeholder="Qisqa tavsif"
            value={editingBlog.excerpt}
            onChange={(e) => setEditingBlog({...editingBlog, excerpt: e.target.value})}
            rows="2"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <textarea
            placeholder="Maqola matni"
            value={editingBlog.content}
            onChange={(e) => setEditingBlog({...editingBlog, content: e.target.value})}
            rows="8"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          
          <input
            type="text"
            placeholder="Rasm yoki video URL (YouTube/Vimeo/MP4)"
            value={editingBlog.image}
            onChange={(e) => setEditingBlog({...editingBlog, image: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          {editingBlog.image && (
            <div className="mt-2">
              {isVideoUrl(editingBlog.image) ? (
                (() => {
                  const yt = toYouTubeEmbed(editingBlog.image);
                  const vm = toVimeoEmbed(editingBlog.image);
                  if (yt || vm) {
                    const src = yt || vm;
                    return (
                      <div className="w-full aspect-video rounded-lg overflow-hidden border">
                        <iframe
                          src={src}
                          title="Video preview"
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        />
                      </div>
                    );
                  }
                  return (
                    <video
                      controls
                      src={editingBlog.image}
                      className="w-full h-48 object-cover rounded-lg border"
                    />
                  );
                })()
              ) : (
                <img
                  src={editingBlog.image}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg border"
                />
              )}
            </div>
          )}
          <div className="flex gap-4">
            <button
              onClick={handleSaveBlog}
              className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              <Save className="w-5 h-5" />
              Saqlash
            </button>
            <button
              onClick={() => setEditingBlog(null)}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            >
              Bekor qilish
            </button>
          </div>
        </div>
      </div>
    )}
    <div className="space-y-4">
      {blogs.map(blog => (
        <div key={blog.id} className="bg-white rounded-xl shadow-sm overflow-hidden flex max-[550px]:flex-col">
          <div className="w-64 h-48 shrink-0 overflow-hidden max-[550px]:w-full">
            {isVideoUrl(blog.image) ? (
              (() => {
                const yt = toYouTubeEmbed(blog.image);
                const vm = toVimeoEmbed(blog.image);
                if (yt || vm) {
                  const src = yt || vm;
                  return (
                    <iframe
                      src={src}
                      title={blog.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  );
                }
                return (
                  <video controls src={blog.image} className="w-full h-full object-cover" />
                );
              })()
            ) : (
              <img
                src={blog.image || 'https://via.placeholder.com/640x360?text=Image'}
                onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/640x360?text=Image'; }}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="flex-1 p-6">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-xl font-bold">{blog.title}</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditingBlog(blog)}
                  className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteBlog(blog.id)}
                  className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <p className="text-gray-600 mb-4">{blog.excerpt}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {blog.tags.map((tag, i) => (
                <span key={i} className="px-3 py-1 bg-green-100 text-green-600 text-sm rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center text-sm text-gray-500 gap-4 max-[550px]:gap-[5px]">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {blog.date}
              </span>
              <span className="flex items-center gap-1">
                <User className="w-4 h-4" />
                {blog.author}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
)}

            {adminPage === 'profile' && (
              <div>
                <div className="flex items-center justify-between mb-8 max-[400px]:flex-col max-[400px]:items-start max-[400px]:gap-2">
                  <h1 className="text-2xl md:text-3xl font-bold">Profil sozlamalari</h1>
                  {!editingProfile ? (
                    <button
                      onClick={() => setEditingProfile(true)}
                      className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition max-[400px]:w-full max-[400px]:mt-2"
                    >
                      <Edit2 className="w-5 h-5" />
                      Tahrirlash
                    </button>
                  ) : (
                    <div className="flex gap-2 max-[400px]:w-full max-[400px]:flex-col max-[400px]:items-stretch">
                      <button
                        onClick={handleSaveProfile}
                        className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition max-[400px]:w-full"
                      >
                        <Save className="w-5 h-5" />
                        Saqlash
                      </button>
                      <button
                        onClick={() => setEditingProfile(false)}
                        className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition max-[400px]:w-full"
                      >
                        Bekor qilish
                      </button>
                    </div>
                  )}
                </div>

                <div className="bg-white p-8 rounded-xl shadow-sm">
                  {editingProfile ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Ism"
                          value={profile.name}
                          onChange={(e) => setProfile({...profile, name: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                        <input
                          type="text"
                          placeholder="Kasb"
                          value={profile.title}
                          onChange={(e) => setProfile({...profile, title: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      <textarea
                        placeholder="Bio"
                        value={profile.bio}
                        onChange={(e) => setProfile({...profile, bio: e.target.value})}
                        rows="4"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="email"
                          placeholder="Email"
                          value={profile.email}
                          onChange={(e) => setProfile({...profile, email: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                        <input
                          type="tel"
                          placeholder="Telefon"
                          value={profile.phone}
                          onChange={(e) => setProfile({...profile, phone: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Manzil"
                        value={profile.location}
                        onChange={(e) => setProfile({...profile, location: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        placeholder="Ko'nikmalar (vergul bilan ajratilgan)"
                        value={profile.skills.join(', ')}
                        onChange={(e) => setProfile({...profile, skills: e.target.value.split(',').map(s => s.trim())})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Ism</h3>
                        <p className="text-gray-600">{profile.name}</p>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Kasb</h3>
                        <p className="text-gray-600">{profile.title}</p>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Bio</h3>
                        <p className="text-gray-600">{profile.bio}</p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-lg font-semibold mb-2">Email</h3>
                          <p className="text-gray-600 break-all">{profile.email}</p>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-2">Telefon</h3>
                          <p className="text-gray-600">{profile.phone}</p>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Manzil</h3>
                        <p className="text-gray-600">{profile.location}</p>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Ko'nikmalar</h3>
                        <div className="flex flex-wrap gap-2">
                          {profile.skills.map((skill, i) => (
                            <span key={i} className="px-4 py-2 bg-purple-100 text-purple-600 rounded-lg">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </main>
        </div>
        {showCredsModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Admin parolini o'zgartirish</h3>
                <button onClick={() => setShowCredsModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                  <input
                    type="text"
                    value={credsDraft.username}
                    onChange={(e) => setCredsDraft({ ...credsDraft, username: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Yangi username"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Parol</label>
                  <input
                    type="text"
                    value={credsDraft.password}
                    onChange={(e) => setCredsDraft({ ...credsDraft, password: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Yangi parol"
                  />
                </div>
                <div className="flex gap-2 justify-end">
                  <button onClick={() => setShowCredsModal(false)} className="px-4 py-2 bg-gray-200 rounded-lg">Bekor qilish</button>
                  <button onClick={handleSaveCreds} className="px-4 py-2 bg-blue-600 text-white rounded-lg">Saqlash</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Public site (non-admin)
  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {profile.name}
            </h1>
            
            <nav className="hidden md:flex items-center gap-8">
              <button
                onClick={() => setCurrentPage('home')}
                className={`font-medium transition ${
                  currentPage === 'home' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Bosh sahifa
              </button>
              <button
                onClick={() => setCurrentPage('projects')}
                className={`font-medium transition ${
                  currentPage === 'projects' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Loyihalar
              </button>
              <button
                onClick={() => setCurrentPage('blog')}
                className={`font-medium transition ${
                  currentPage === 'blog' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Blog
              </button>
              <button
                onClick={() => setCurrentPage('contact')}
                className={`font-medium transition ${
                  currentPage === 'contact' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Aloqa
              </button>
              <button
                onClick={() => setShowLogin(true)}
                className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition"
              >
                Admin
              </button>
            </nav>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {mobileMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 space-y-2">
              <button
                onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }}
                className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Bosh sahifa
              </button>
              <button
                onClick={() => { setCurrentPage('projects'); setMobileMenuOpen(false); }}
                className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Loyihalar
              </button>
              <button
                onClick={() => { setCurrentPage('blog'); setMobileMenuOpen(false); }}
                className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Blog
              </button>
              <button
                onClick={() => { setCurrentPage('contact'); setMobileMenuOpen(false); }}
                className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Aloqa
              </button>
              <button
                onClick={() => { setShowLogin(true); setMobileMenuOpen(false); }}
                className="block w-full text-left px-4 py-2 bg-gray-900 text-white rounded-lg"
              >
                Admin
              </button>
            </nav>
          )}
        </div>
      </header>

      {showLogin && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Admin Login</h2>
              <button onClick={() => setShowLogin(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={loginData.username}
                  onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Loginni kiriting"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Parolni kiriting"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
              >
                Kirish
              </button>
              <p className="text-sm text-gray-500 text-center">
                Iltimos, login va parolni kiriting
              </p>
            </form>
          </div>
        </div>
      )}
      {toast.visible && (
        <div className={`fixed top-6 right-6 z-50 px-5 py-4 rounded-xl shadow-lg border backdrop-blur-sm transition ${
          toast.type === 'success' ? 'bg-green-100/90 text-green-900 border-green-300' : 'bg-red-100/90 text-red-900 border-red-300'
        }`}
          style={{ fontWeight: 600 }}
        >
          {toast.text}
        </div>
      )}
      <main className="pt-20">
        {currentPage === 'home' && (
          <div>
            <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 -z-10" />
              <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl -z-10" />
              <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl -z-10" />
              
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-6xl md:text-7xl max-[450px]:text-4xl font-bold mb-6 leading-tight">
                  {profile.name}
                </h1>
                <p className="text-2xl md:text-3xl max-[450px]:text-xl text-gray-600 mb-8">
                  {profile.title}
                </p>
                <p className="text-xl max-[450px]:text-base text-gray-500 mb-12 max-[450px]:mb-8 max-w-2xl mx-auto">
                  {profile.bio}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <button
                    onClick={() => setCurrentPage('projects')}
                    className="px-8 py-4 max-[450px]:px-6 max-[450px]:py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition font-medium text-lg max-[450px]:text-base"
                  >
                    Loyihalarni ko'rish
                  </button>
                  <button
                    onClick={() => setCurrentPage('contact')}
                    className="px-8 py-4 max-[450px]:px-6 max-[450px]:py-3 border-2 border-gray-900 text-gray-900 rounded-xl hover:bg-gray-900 hover:text-white transition font-medium text-lg max-[450px]:text-base"
                  >
                    Bog'lanish
                  </button>
                </div>

                <div className="mt-16 flex flex-wrap items-center justify-center gap-3">
                  {profile.skills.map((skill, i) => (
                    <span key={i} className="px-6 py-3 bg-white/80 backdrop-blur-sm text-gray-700 rounded-xl shadow-sm text-lg">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {currentPage === 'projects' && (
          <div className="max-w-7xl mx-auto px-6 py-20">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-4">Mening loyihalarim</h2>
              <p className="text-xl text-gray-600">Professional web development ishlarim</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map(project => (
                <div key={project.id} className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition">
                  <div className="relative overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition flex items-end justify-center pb-6 gap-4">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition"
                        >
                          <Code className="w-5 h-5" />
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, i) => (
                        <span key={i} className="px-3 py-1 bg-blue-100 text-blue-600 text-sm rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentPage === 'blog' && (
          <div className="max-w-5xl mx-auto px-6 py-20">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-4">Blog</h2>
              <p className="text-xl text-gray-600">Texnologiya va dasturlash haqida maqolalar</p>
            </div>

            <div className="space-y-8">
              {blogs.map(blog => (
                <article key={blog.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition">
                  <div className="md:flex">
                    <div className="w-full md:w-80 h-64 shrink-0 overflow-hidden">
                      {isVideoUrl(blog.image) ? (
                        (() => {
                          const yt = toYouTubeEmbed(blog.image);
                          const vm = toVimeoEmbed(blog.image);
                          if (yt || vm) {
                            const src = yt || vm;
                            return (
                              <iframe
                                src={src}
                                title={blog.title}
                                className="w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                              />
                            );
                          }
                          return (
                            <video controls src={blog.image} className="w-full h-full object-cover" />
                          );
                        })()
                      ) : (
                        <img
                          src={blog.image || 'https://via.placeholder.com/640x360?text=Image'}
                          onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/640x360?text=Image'; }}
                          alt={blog.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1 p-8">
                      <h3 className="text-3xl font-bold mb-3">{blog.title}</h3>
                      <p className="text-gray-600 mb-4 text-lg">{blog.excerpt}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {blog.tags.map((tag, i) => (
                          <span key={i} className="px-3 py-1 bg-green-100 text-green-600 text-sm rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-6 text-gray-500">
                        <span className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {blog.date}
                        </span>
                        <span className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          {blog.author}
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {currentPage === 'contact' && (
          <div className="max-w-4xl mx-auto px-6 py-20">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-4">Bog'lanish</h2>
              <p className="text-xl text-gray-600">Loyihalaringiz uchun menga murojaat qiling</p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 max-[450px]:gap-6">
              <div className="space-y-8">
                <div className="flex items-start gap-4 max-[450px]:gap-3">
                  <div className="p-3 max-[450px]:p-2 bg-blue-100 rounded-lg">
                    <Mail className="w-6 h-6 max-[450px]:w-5 max-[450px]:h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg max-[450px]:text-base mb-1">Email</h3>
                    <p className="text-gray-600 max-[450px]:text-sm break-all">{profile.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 max-[450px]:gap-3">
                  <div className="p-3 max-[450px]:p-2 bg-green-100 rounded-lg">
                    <Mail className="w-6 h-6 max-[450px]:w-5 max-[450px]:h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg max-[450px]:text-base mb-1">Telefon</h3>
                    <p className="text-gray-600 max-[450px]:text-sm">{profile.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 max-[450px]:gap-3">
                  <div className="p-3 max-[450px]:p-2 bg-purple-100 rounded-lg">
                    <User className="w-6 h-6 max-[450px]:w-5 max-[450px]:h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg max-[450px]:text-base mb-1">Manzil</h3>
                    <p className="text-gray-600 max-[450px]:text-sm">{profile.location}</p>
                  </div>
                </div>
              </div>

              <form className="space-y-4" onSubmit={handleContactSubmit}>
                <input
                  type="text"
                  placeholder="Ismingiz"
                  value={contact.name}
                  onChange={(e) => setContact({ ...contact, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={contact.email}
                  onChange={(e) => setContact({ ...contact, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <textarea
                  placeholder="Xabaringiz"
                  rows="6"
                  value={contact.message}
                  onChange={(e) => setContact({ ...contact, message: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="w-full py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition font-medium"
                >
                  Xabar yuborish
                </button>
              </form>
            </div>
          </div>
        )}
      </main>

      {toast.visible && (
        <div className={`fixed top-6 right-6 z-50 px-5 py-4 rounded-xl shadow-lg border backdrop-blur-sm transition ${
          toast.type === 'success' ? 'bg-green-100/90 text-green-900 border-green-300' : 'bg-red-100/90 text-red-900 border-red-300'
        }`}
          style={{ fontWeight: 600 }}
        >
          {toast.text}
        </div>
      )}
      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-400">
            © 2024 {profile.name}. Barcha huquqlar himoyalangan.
          </p>
        </div>
      </footer>
    </div>
  );
}

// Mount React app to DOM
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PortfolioAdminPanel />
  </React.StrictMode>
);