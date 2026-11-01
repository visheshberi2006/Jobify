// // import React, { useMemo, useState } from 'react'
// // import { createRoot } from 'react-dom/client'
// // import {
// //   ShieldCheck, LayoutDashboard, ScanSearch, FileSearch, FileText, GraduationCap,
// //   Settings, Bell, ChevronDown, ArrowUpRight, ArrowRight, UploadCloud, Link2,
// //   CheckCircle2, AlertTriangle, CircleHelp, Sparkles, Menu, X, LockKeyhole,
// //   ShieldAlert, ClipboardCheck, BriefcaseBusiness, Clock3, FileCheck2, Target,
// //   Lightbulb, CircleCheck, RotateCcw, BrainCircuit, MessageSquareText
// // } from 'lucide-react'
// // import './styles.css'
// // import './jobify-accessibility.css'

// // const API = 'http://127.0.0.1:8000'

// // const navItems = [
// //   { id: 'overview', label: 'Overview', icon: LayoutDashboard, group: 'WORKSPACE' },
// //   { id: 'scan', label: 'Scam detector', icon: ScanSearch, group: 'WORKSPACE' },
// //   { id: 'document', label: 'Document scan', icon: FileSearch, group: 'WORKSPACE' },
// //   { id: 'resume', label: 'Resume matcher', icon: FileText, group: 'CAREER TOOLS' },
// //   { id: 'coach', label: 'Skill coach', icon: GraduationCap, group: 'CAREER TOOLS' },
// //   { id: 'interview', label: 'AI mock interview', icon: ClipboardCheck, group: 'CAREER TOOLS' },
// //   { id: 'email', label: 'HR email intelligence', icon: BriefcaseBusiness, group: 'CAREER TOOLS' },
// // ]

// // async function readResponse(response) {
// //   const data = await response.json().catch(() => ({}))
// //   if (!response.ok) {
// //     const detail = data.detail
// //     throw new Error(typeof detail === 'string' ? detail : `Request failed (${response.status})`)
// //   }
// //   return data
// // }

// // function App() {
// //   const [page, setPage] = useState('overview')
// //   const [mobileNav, setMobileNav] = useState(false)
// //   const [message, setMessage] = useState('')
// //   const [documentFile, setDocumentFile] = useState(null)
// //   const [resume, setResume] = useState(null)
// //   const [jobDescription, setJobDescription] = useState('')
// //   const [targetJob, setTargetJob] = useState('Frontend Developer')
// //   const [skills, setSkills] = useState('React, TypeScript, Testing')
// //   const [result, setResult] = useState(null)
// //   const [documentResult, setDocumentResult] = useState(null)
// //   const [resumeResult, setResumeResult] = useState(null)
// //   const [roadmapResult, setRoadmapResult] = useState(null)
// //   const [notice, setNotice] = useState('')
// //   const [showProfile, setShowProfile] = useState(false)
// //   const [busy, setBusy] = useState(false)
// //   const [gmailConnected, setGmailConnected] = useState(false)
// //   const [gmailStats, setGmailStats] = useState(null)
// //   const [gmailEmails, setGmailEmails] = useState([])
// //   const [gmailLoading, setGmailLoading] = useState(false)
// //   const [interviewType, setInterviewType] = useState('both')
// //   const [interviewDifficulty, setInterviewDifficulty] = useState('adaptive')
// //   const [interviewSession, setInterviewSession] = useState(null)
// //   const [interviewQuestion, setInterviewQuestion] = useState(null)
// //   const [interviewAnswer, setInterviewAnswer] = useState('')
// //   const [interviewFeedback, setInterviewFeedback] = useState(null)
// //   const [interviewHistory, setInterviewHistory] = useState([])
// //   const [interviewFinished, setInterviewFinished] = useState(false)

// //   const title = navItems.find(item => item.id === page)?.label || 'Overview'
// //   const wordCount = useMemo(
// //     () => message.trim() ? message.trim().split(/\s+/).length : 0,
// //     [message]
// //   )

// //   function changePage(id) {
// //     setPage(id)
// //     setMobileNav(false)
// //     setNotice('')
// //   }

// //   async function demoScan() {
// //     if (message.trim().length < 10) {
// //       setNotice('Enter at least 10 characters to analyze.')
// //       return
// //     }
// //     setBusy(true)
// //     setNotice('Analyzing message with Jobify AI...')
// //     setResult(null)
// //     try {
// //       const response = await fetch(`${API}/api/analyze`, {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ text: message })
// //       })
// //       const data = await readResponse(response)
// //       setResult({
// //         score: data.risk_score,
// //         level: data.risk_level || data.risk || 'UNKNOWN',
// //         category: data.category || 'UNCLASSIFIED',
// //         ruleScore: data.rule_score,
// //         mlScore: data.ml_score,
// //         indicators: Array.isArray(data.indicators) ? data.indicators : [],
// //         recommendation: data.recommendation || 'Verify the employer independently.',
// //         gemini_analysis: data.gemini_analysis
// //       })
// //       setNotice('Analysis completed successfully.')
// //     } catch (error) {
// //       console.error('Jobify analysis error:', error)
// //       setNotice(error.message || 'Could not connect to the backend.')
// //     } finally {
// //       setBusy(false)
// //     }
// //   }

// //   async function analyzeDocument() {
// //     if (!documentFile) {
// //       setNotice('Choose a document first.')
// //       return
// //     }
// //     setBusy(true)
// //     setDocumentResult(null)
// //     setNotice('Analyzing document...')
// //     try {
// //       const formData = new FormData()
// //       formData.append('file', documentFile)
// //       const response = await fetch(`${API}/api/document/analyze`, {
// //         method: 'POST',
// //         body: formData
// //       })
// //       const data = await readResponse(response)
// //       setDocumentResult(data)
// //       setNotice('Document analysis completed.')
// //     } catch (error) {
// //       console.error('Document analysis error:', error)
// //       setNotice(error.message || 'Document analysis failed.')
// //     } finally {
// //       setBusy(false)
// //     }
// //   }

// //   async function matchResume() {
// //     if (!resume) {
// //       setNotice('Upload your resume first.')
// //       return
// //     }
// //     if (!jobDescription.trim()) {
// //       setNotice('Enter a job description first.')
// //       return
// //     }
// //     setBusy(true)
// //     setResumeResult(null)
// //     setNotice('Matching your resume...')
// //     try {
// //       const formData = new FormData()
// //       formData.append('file', resume)
// //       formData.append('job_description', jobDescription)
// //       const response = await fetch(`${API}/api/resume/match`, {
// //         method: 'POST',
// //         body: formData
// //       })
// //       const data = await readResponse(response)
// //       setResumeResult(data)
// //       setNotice('Resume matching completed.')
// //     } catch (error) {
// //       console.error('Resume matching error:', error)
// //       setNotice(error.message || 'Resume matching failed.')
// //     } finally {
// //       setBusy(false)
// //     }
// //   }

// //   async function generateRoadmap() {
// //     const missingSkills = skills.split(',').map(skill => skill.trim()).filter(Boolean)
// //     if (!targetJob.trim()) {
// //       setNotice('Enter your target job role.')
// //       return
// //     }
// //     if (!missingSkills.length) {
// //       setNotice('Enter at least one skill.')
// //       return
// //     }
// //     setBusy(true)
// //     setRoadmapResult(null)
// //     setNotice('Generating your learning roadmap...')
// //     try {
// //       const response = await fetch(`${API}/api/skill-coach/roadmap`, {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ target_job: targetJob, missing_skills: missingSkills })
// //       })
// //       const data = await readResponse(response)
// //       setRoadmapResult(data)
// //       setNotice('Your learning roadmap is ready.')
// //     } catch (error) {
// //       console.error('Roadmap error:', error)
// //       setNotice(error.message || 'Roadmap generation failed.')
// //     } finally {
// //       setBusy(false)
// //     }
// //   }

// //   async function startInterview() {
// //     if (!targetJob.trim()) {
// //       setNotice('Enter the role you want to practise for.')
// //       return
// //     }
// //     setBusy(true)
// //     setInterviewSession(null)
// //     setInterviewQuestion(null)
// //     setInterviewAnswer('')
// //     setInterviewFeedback(null)
// //     setInterviewHistory([])
// //     setInterviewFinished(false)
// //     setNotice('Preparing your AI mock interview...')
// //     try {
// //       const data = await readResponse(await fetch(`${API}/api/interview/start`, {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({
// //           target_job: targetJob,
// //           interview_type: interviewType,
// //           difficulty: interviewDifficulty
// //         })
// //       }))
// //       const question = data.current_question || data.question || data.first_question
// //       setInterviewSession(data.session_id || data.id || null)
// //       setInterviewQuestion(question)
// //       setNotice(question ? 'Your mock interview is ready. Answer the first question.' : 'Interview started, but the backend did not return a question.')
// //     } catch (error) {
// //       console.error('Interview start error:', error)
// //       setNotice(error.message || 'Could not start the mock interview. The interview backend may not be connected yet.')
// //     } finally {
// //       setBusy(false)
// //     }
// //   }

// //   async function submitInterviewAnswer() {
// //     if (!interviewSession || !interviewQuestion) {
// //       setNotice('Start a mock interview first.')
// //       return
// //     }
// //     if (!interviewAnswer.trim()) {
// //       setNotice('Write your answer before submitting.')
// //       return
// //     }
// //     setBusy(true)
// //     setNotice('Evaluating your answer...')
// //     try {
// //       const data = await readResponse(await fetch(`${API}/api/interview/answer`, {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({
// //           session_id: interviewSession,
// //           question_id: interviewQuestion.id || interviewQuestion.question_id || null,
// //           question: interviewQuestion.question || interviewQuestion.text || interviewQuestion.prompt || '',
// //           answer: interviewAnswer
// //         })
// //       }))
// //       const feedback = data.feedback || data.evaluation || data.result || data
// //       setInterviewHistory(previous => [...previous, {
// //         question: interviewQuestion.question || interviewQuestion.text || interviewQuestion.prompt || '',
// //         answer: interviewAnswer,
// //         feedback
// //       }])
// //       setInterviewFeedback(feedback)
// //       const nextQuestion = data.next_question || data.current_question
// //       setInterviewAnswer('')
// //       if (nextQuestion) {
// //         setInterviewQuestion(nextQuestion)
// //         setNotice('Answer evaluated. Your next question is ready.')
// //       } else if (data.completed || data.finished || data.is_complete) {
// //         setInterviewQuestion(null)
// //         setInterviewFinished(true)
// //         setNotice('Mock interview completed. Review your feedback below.')
// //       } else {
// //         setInterviewQuestion(null)
// //         setInterviewFinished(true)
// //         setNotice('No further question was returned. Review your feedback below.')
// //       }
// //     } catch (error) {
// //       console.error('Interview answer error:', error)
// //       setNotice(error.message || 'Could not evaluate your answer.')
// //     } finally {
// //       setBusy(false)
// //     }
// //   }

// //   function resetInterview() {
// //     setInterviewSession(null)
// //     setInterviewQuestion(null)
// //     setInterviewAnswer('')
// //     setInterviewFeedback(null)
// //     setInterviewHistory([])
// //     setInterviewFinished(false)
// //     setNotice('')
// //   }

// //   async function loadGmail() {
// //     setGmailLoading(true)
// //     setNotice('Checking Gmail connection...')
// //     try {
// //       const status = await readResponse(await fetch(`${API}/api/email/status`))
// //       const connected = Boolean(status.connected)
// //       setGmailConnected(connected)
// //       if (!connected) {
// //         setGmailStats(null)
// //         setGmailEmails([])
// //         setNotice('Gmail is not connected yet. Connect your account to continue.')
// //         return
// //       }
// //       const [dashboard, saved] = await Promise.all([
// //         fetch(`${API}/api/email/dashboard`).then(readResponse),
// //         fetch(`${API}/api/email/saved`).then(readResponse)
// //       ])
// //       setGmailStats(dashboard.dashboard || dashboard)
// //       setGmailEmails(Array.isArray(saved.emails) ? saved.emails : [])
// //       setNotice('Gmail connected. Your saved messages are loaded.')
// //     } catch (error) {
// //       console.error('Gmail loading error:', error)
// //       setNotice(error.message || 'Could not load Gmail data.')
// //     } finally {
// //       setGmailLoading(false)
// //     }
// //   }

// //   async function syncGmail() {
// //     setGmailLoading(true)
// //     setNotice('Syncing Gmail messages...')
// //     try {
// //       await readResponse(await fetch(`${API}/api/email/sync`, { method: 'POST' }))
// //       await loadGmail()
// //       setNotice('Gmail sync completed.')
// //     } catch (error) {
// //       setNotice(error.message || 'Gmail sync failed.')
// //     } finally {
// //       setGmailLoading(false)
// //     }
// //   }

// //   function resetResult() {
// //     setResult(null)
// //     setNotice('')
// //   }

// //   return (
// //     <div className="app-shell">
// //       <aside className={`sidebar ${mobileNav ? 'sidebar-open' : ''}`}>
// //         <div className="brand-row">
// //           <div className="brand-mark"><ShieldCheck size={23} strokeWidth={2.2} /></div>
// //           <div className="brand-name">Jobify<span>.</span><small>CAREER SAFETY</small></div>
// //           <button className="icon-button mobile-close" onClick={() => setMobileNav(false)} aria-label="Close menu"><X size={19} /></button>
// //         </div>
// //         <div className="workspace-pill"><span className="workspace-dot" /> Personal workspace <ChevronDown size={14} /></div>
// //         {['WORKSPACE', 'CAREER TOOLS'].map(group => (
// //           <div className="nav-group" key={group}>
// //             <div className="nav-label">{group}</div>
// //             {navItems.filter(item => item.group === group).map(item => {
// //               const Icon = item.icon
// //               return (
// //                 <button key={item.id} className={`nav-item ${page === item.id ? 'active' : ''}`} onClick={() => changePage(item.id)}>
// //                   <Icon size={18} /><span>{item.label}</span>{item.id === 'scan' && <span className="nav-new">AI</span>}
// //                 </button>
// //               )
// //             })}
// //           </div>
// //         ))}
// //         <div className="sidebar-bottom">
// //           <div className="security-mini">
// //             <div className="security-mini-icon"><LockKeyhole size={17} /></div>
// //             <div><b>Your safety comes first</b><span>Review every opportunity carefully.</span></div>
// //           </div>
// //           <button className="nav-item settings-item" onClick={() => setNotice('Settings will be available in a future version.')}><Settings size={18} /><span>Settings</span></button>
// //           <div className="sidebar-user">
// //             <div className="avatar">JD</div><div className="user-meta"><b>Job Seeker</b><span>Free workspace</span></div>
// //             <button className="icon-button" aria-label="Profile menu" onClick={() => setShowProfile(!showProfile)}><ChevronDown size={16} /></button>
// //             {showProfile && <div className="profile-popover">Demo profile<br /><small>No account connected</small></div>}
// //           </div>
// //         </div>
// //       </aside>

// //       {mobileNav && <button className="scrim" onClick={() => setMobileNav(false)} aria-label="Close navigation" />}
// //       <main className="main-area">
// //         <header className="topbar">
// //           <div className="topbar-left">
// //             <button className="icon-button mobile-menu" onClick={() => setMobileNav(true)} aria-label="Open menu"><Menu size={20} /></button>
// //             <div className="breadcrumbs">Workspace <span>/</span> <b>{title}</b></div>
// //           </div>
// //           <div className="topbar-actions">
// //             <div className="demo-badge"><span /> Backend connected locally</div>
// //             <button className="icon-button notification" aria-label="Notifications" onClick={() => setNotice('You are all caught up.')}><Bell size={18} /><i /></button>
// //             <div className="top-avatar">JD</div>
// //           </div>
// //         </header>

// //         <div className="page-content">
// //           {notice && <div className="notice global-notice"><CircleHelp size={16} />{notice}</div>}

// //           {page === 'overview' && <Overview setPage={changePage} />}

// //           {page === 'scan' && (
// //             <section>
// //               <PageHeading eyebrow="AI SECURITY TOOL" title="Check a job message" description="Review suspicious job offers, recruiter messages, or job descriptions before you respond." />
// //               <div className="tool-layout">
// //                 <div className="panel scan-panel">
// //                   <div className="panel-heading">
// //                     <div className="heading-icon purple"><ScanSearch size={19} /></div>
// //                     <div><h3>Message analysis</h3><p>Paste the text you want to check.</p></div>
// //                     <span className="panel-tag">Up to 5,000 characters</span>
// //                   </div>
// //                   <label className="field-label" htmlFor="message">Message or job offer</label>
// //                   <textarea id="message" className="text-area" maxLength={5000} value={message} onChange={event => { setMessage(event.target.value); setNotice('') }} placeholder="Paste the recruiter message, job offer, or suspicious text here…" />
// //                   <div className="input-foot"><span>Do not include passwords or private account details.</span><span>{message.length}/5,000 · {wordCount} words</span></div>
// //                   <div className="sample-row">
// //                     <span>Try an example:</span>
// //                     <button className="sample-chip" onClick={() => setMessage('Congratulations! You have been selected for a remote job. Pay a refundable registration fee today to secure your position.')}>Urgent payment request</button>
// //                     <button className="sample-chip" onClick={() => setMessage('We would like to schedule an interview for the software developer position. Please review the job description and reply with your available times.')}>Interview invitation</button>
// //                   </div>
// //                   <button className="primary-button full-button" onClick={demoScan} disabled={busy}><Sparkles size={17} /> {busy ? 'Analyzing...' : 'Analyze with Jobify AI'} <ArrowRight size={17} /></button>
// //                   <div className="privacy-note"><LockKeyhole size={15} /> Message text is sent to your local Jobify backend for analysis.</div>
// //                 </div>
// //                 <div className="panel side-info-panel">
// //                   <div className="info-illustration"><div className="illustration-orbit orbit-a" /><div className="illustration-orbit orbit-b" /><div className="illustration-core"><ShieldCheck size={42} /></div><span className="spark spark-a" /><span className="spark spark-b" /></div>
// //                   <h3>Look beyond the wording</h3>
// //                   <p>Scam messages can look professional. Check payment requests, recruiter identity, and links before sharing information.</p>
// //                   <div className="check-list"><div><CheckCircle2 size={17} /> Unexpected fees or deposits</div><div><CheckCircle2 size={17} /> Pressure to act immediately</div><div><CheckCircle2 size={17} /> Unverified company details</div></div>
// //                   <div className="info-footer"><ShieldAlert size={17} /><span>Even a low-risk result cannot guarantee that a job is legitimate.</span></div>
// //                 </div>
// //               </div>

// //               {result && (
// //                 <div className="panel result-panel">
// //                   <div className="result-header">
// //                     <div><span className="section-kicker">LIVE AI ANALYSIS</span><h3>Job risk assessment</h3></div>
// //                     <button className="text-button" onClick={resetResult}><RotateCcw size={15} /> Clear result</button>
// //                   </div>
// //                   <div className="result-grid">
// //                     <div className="score-card">
// //                       <div className="score-ring"><strong>{Number(result.score ?? 0).toFixed(2)}</strong><small>/100</small></div>
// //                       <span className={result.level === 'LOW' ? 'risk-low' : result.level === 'MEDIUM' ? 'risk-medium' : 'risk-high'}>{result.level} RISK</span>
// //                       <p>{result.category}</p>
// //                       <small>Rule score: {result.ruleScore ?? '—'} · ML score: {result.mlScore ?? '—'}</small>
// //                     </div>
// //                     <div className="result-details">
// //                       <h4>Potential warning signs</h4>
// //                       {result.indicators.length ? result.indicators.map((item, index) => (
// //                         <div className="indicator" key={`${item.name}-${index}`}><AlertTriangle size={16} /><span>{item.name}</span><span className="indicator-weight">{item.weight}</span></div>
// //                       )) : <p>No rule-based warning indicators were returned. Still verify the employer independently.</p>}
// //                       <div className="recommendation"><b>Recommended next step</b><p>{result.recommendation}</p></div>
// //                     </div>
// //                   </div>
// //                   {result.gemini_analysis?.enabled && (
// //                     <div className="recommendation ai-explanation">
// //                       <b>AI investigation and safety advice</b>
// //                       <p style={{ whiteSpace: 'pre-wrap', lineHeight: 1.7 }}>{result.gemini_analysis.explanation}</p>
// //                       <small>AI provider: {result.gemini_analysis.provider}</small>
// //                     </div>
// //                   )}
// //                   <div className="demo-disclaimer">Generated by Jobify's machine-learning and AI services. This is a screening aid, not proof of fraud or legitimacy.</div>
// //                 </div>
// //               )}
// //             </section>
// //           )}

// //           {page === 'document' && (
// //             <section>
// //               <PageHeading eyebrow="DOCUMENT CHECK" title="Scan a job document" description="Upload a PDF, DOCX, or supported image of a job offer for text extraction and scam analysis." />
// //               <div className="panel document-panel">
// //                 <div className="panel-heading"><div className="heading-icon purple"><FileSearch size={19} /></div><div><h3>Upload a document</h3><p>Supported formats depend on the backend document parser.</p></div></div>
// //                 <label className={`drop-zone ${documentFile ? 'has-file' : ''}`}>
// //                   <input type="file" accept=".pdf,.docx,.png,.jpg,.jpeg" onChange={event => { setDocumentFile(event.target.files?.[0] || null); setDocumentResult(null); setNotice('') }} />
// //                   <div className="upload-icon"><UploadCloud size={26} /></div>
// //                   <b>{documentFile ? documentFile.name : 'Choose a file or drag it here'}</b>
// //                   <span>{documentFile ? `${(documentFile.size / 1024 / 1024).toFixed(2)} MB · selected` : 'PDF, DOCX, PNG, JPG or JPEG'}</span>
// //                   <span className="browse-button">{documentFile ? 'Choose another file' : 'Browse files'}</span>
// //                 </label>
// //                 <button className="primary-button" onClick={analyzeDocument} disabled={busy}><FileSearch size={17} /> {busy ? 'Analyzing...' : 'Analyze document'}</button>
// //                 <div className="privacy-note"><LockKeyhole size={15} /> The selected file is uploaded to your local backend for processing.</div>
// //               </div>
// //               {documentResult && <DocumentResult data={documentResult} />}
// //               <div className="three-tip-grid"><Tip icon={FileCheck2} title="Readable text" text="Use a clear document with selectable text when possible." /><Tip icon={ShieldCheck} title="Verify the source" text="Check the sender and employer independently." /><Tip icon={Clock3} title="Review carefully" text="Do not rush into paying fees or sharing documents." /></div>
// //             </section>
// //           )}

// //           {page === 'resume' && (
// //             <section>
// //               <PageHeading eyebrow="CAREER MATCHING" title="Match your resume to a role" description="Compare a resume with a job description to review text similarity and skill coverage." />
// //               <div className="panel resume-panel">
// //                 <div className="panel-heading"><div className="heading-icon purple"><FileText size={19} /></div><div><h3>Resume and job details</h3><p>Upload a resume and paste the role description.</p></div><span className="panel-tag">Maximum file size: 5 MB</span></div>
// //                 <label className="field-label">Resume file</label>
// //                 <label className={`resume-drop ${resume ? 'has-file' : ''}`}>
// //                   <input type="file" accept=".pdf,.docx" onChange={event => { setResume(event.target.files?.[0] || null); setResumeResult(null); setNotice('') }} />
// //                   <div className="upload-icon small"><UploadCloud size={22} /></div>
// //                   <div><b>{resume ? resume.name : 'Upload your resume'}</b><span>{resume ? `${(resume.size / 1024 / 1024).toFixed(2)} MB selected` : 'PDF or DOCX'}</span></div>
// //                   <span className="browse-button">{resume ? 'Change' : 'Browse'}</span>
// //                 </label>
// //                 <label className="field-label" htmlFor="job-desc">Job description</label>
// //                 <textarea id="job-desc" className="text-area job-textarea" maxLength={10000} value={jobDescription} onChange={event => setJobDescription(event.target.value)} placeholder="Paste the target job description, required skills, and responsibilities…" />
// //                 <div className="input-foot"><span>Include required skills for a useful comparison.</span><span>{jobDescription.length}/10,000</span></div>
// //                 <button className="primary-button" onClick={matchResume} disabled={busy}><Target size={17} /> {busy ? 'Matching...' : 'Match resume'}</button>
// //                 <div className="privacy-note"><LockKeyhole size={15} /> Your resume and job description are uploaded to your local backend.</div>
// //               </div>
// //               {resumeResult && <ResultObject title="Resume match result" data={resumeResult} />}
// //               <div className="three-tip-grid"><Tip icon={Target} title="Text similarity" text="Estimate how closely resume content aligns with the role." /><Tip icon={CheckCircle2} title="Matched skills" text="Identify skills mentioned in both documents." /><Tip icon={Lightbulb} title="Skill gaps" text="Use missing skills to plan your next learning steps." /></div>
// //             </section>
// //           )}

// //           {page === 'coach' && (
// //             <section>
// //               <PageHeading eyebrow="PERSONALISED LEARNING" title="Build a skill roadmap" description="Enter a target role and skills you want to improve to generate a learning roadmap." />
// //               <div className="coach-layout">
// //                 <div className="panel coach-panel">
// //                   <div className="panel-heading"><div className="heading-icon purple"><GraduationCap size={19} /></div><div><h3>Your learning goal</h3><p>Use the role and skill gaps from your resume review.</p></div></div>
// //                   <label className="field-label" htmlFor="target-job">Target job role</label>
// //                   <input id="target-job" className="text-input" maxLength={150} value={targetJob} onChange={event => setTargetJob(event.target.value)} placeholder="e.g. Frontend Developer" />
// //                   <label className="field-label" htmlFor="missing-skills">Skills to improve</label>
// //                   <textarea id="missing-skills" className="text-area skills-textarea" value={skills} onChange={event => setSkills(event.target.value)} placeholder="Enter missing skills separated by commas…" />
// //                   <div className="input-foot"><span>Enter skills separated by commas.</span><span>{skills.split(',').map(skill => skill.trim()).filter(Boolean).length} skills</span></div>
// //                   <button className="primary-button" onClick={generateRoadmap} disabled={busy}><Sparkles size={17} /> {busy ? 'Generating...' : 'Generate learning roadmap'}</button>
// //                 </div>
// //                 <div className="panel roadmap-preview">
// //                   <div className="roadmap-top"><div className="heading-icon peach"><Lightbulb size={20} /></div><span className="panel-tag">LEARNING PLAN</span></div>
// //                   <h3>A clear path to your next role</h3>
// //                   {roadmapResult ? <ResultObject title="Generated roadmap" data={roadmapResult} /> : <p>Your personalised roadmap will appear here after generation.</p>}
// //                 </div>
// //               </div>
// //             </section>
// //           )}

// //           {page === 'interview' && (
// //             <section>
// //               <PageHeading
// //                 eyebrow="AI INTERVIEW ARENA"
// //                 title="Practise before the real interview"
// //                 description="Take an adaptive mock interview, answer one question at a time, and receive feedback on your responses."
// //               />
// //               {!interviewSession && (
// //                 <div className="panel resume-panel">
// //                   <div className="panel-heading">
// //                     <div className="heading-icon purple"><ClipboardCheck size={19} /></div>
// //                     <div><h3>Set up your mock interview</h3><p>Choose the role and interview format you want to practise.</p></div>
// //                     <span className="panel-tag">AI PRACTICE</span>
// //                   </div>
// //                   <label className="field-label" htmlFor="interview-role">Target job role</label>
// //                   <input id="interview-role" className="text-input" maxLength={150} value={targetJob} onChange={event => setTargetJob(event.target.value)} placeholder="e.g. Python Developer" />
// //                   <label className="field-label">Interview type</label>
// //                   <div className="sample-row">
// //                     <button className={`sample-chip ${interviewType === 'technical' ? 'selected' : ''}`} onClick={() => setInterviewType('technical')}>Technical</button>
// //                     <button className={`sample-chip ${interviewType === 'hr' ? 'selected' : ''}`} onClick={() => setInterviewType('hr')}>HR / Behavioural</button>
// //                     <button className={`sample-chip ${interviewType === 'both' ? 'selected' : ''}`} onClick={() => setInterviewType('both')}>Both</button>
// //                   </div>
// //                   <label className="field-label">Difficulty</label>
// //                   <div className="sample-row">
// //                     <button className={`sample-chip ${interviewDifficulty === 'easy' ? 'selected' : ''}`} onClick={() => setInterviewDifficulty('easy')}>Beginner</button>
// //                     <button className={`sample-chip ${interviewDifficulty === 'medium' ? 'selected' : ''}`} onClick={() => setInterviewDifficulty('medium')}>Intermediate</button>
// //                     <button className={`sample-chip ${interviewDifficulty === 'hard' ? 'selected' : ''}`} onClick={() => setInterviewDifficulty('hard')}>Advanced</button>
// //                     <button className={`sample-chip ${interviewDifficulty === 'adaptive' ? 'selected' : ''}`} onClick={() => setInterviewDifficulty('adaptive')}>Adaptive</button>
// //                   </div>
// //                   <button className="primary-button" onClick={startInterview} disabled={busy}>
// //                     <Sparkles size={17} /> {busy ? 'Preparing...' : 'Start AI mock interview'} <ArrowRight size={17} />
// //                   </button>
// //                   <div className="privacy-note"><LockKeyhole size={15} /> Your answers are sent to the Jobify backend for evaluation.</div>
// //                 </div>
// //               )}

// //               {interviewSession && (
// //                 <div className="panel result-panel">
// //                   <div className="result-header">
// //                     <div><span className="section-kicker">LIVE MOCK INTERVIEW</span><h3>{targetJob}</h3></div>
// //                     <button className="text-button" onClick={resetInterview}><RotateCcw size={15} /> End / restart</button>
// //                   </div>
// //                   {interviewQuestion && (
// //                     <div className="coach-panel">
// //                       <span className="panel-tag">QUESTION {interviewHistory.length + 1}</span>
// //                       <h3 style={{ marginTop: 12 }}>{interviewQuestion.question || interviewQuestion.text || interviewQuestion.prompt || 'The interview backend returned an empty question.'}</h3>
// //                       {interviewQuestion.category && <span className="panel-tag">{interviewQuestion.category}</span>}
// //                       <label className="field-label" htmlFor="interview-answer">Your answer</label>
// //                       <textarea id="interview-answer" className="text-area" rows={7} value={interviewAnswer} onChange={event => setInterviewAnswer(event.target.value)} placeholder="Structure your response clearly. Explain your reasoning and give examples where possible." />
// //                       <button className="primary-button" onClick={submitInterviewAnswer} disabled={busy || !interviewAnswer.trim()}>
// //                         <Sparkles size={17} /> {busy ? 'Evaluating...' : 'Submit answer'}
// //                       </button>
// //                     </div>
// //                   )}
// //                   {interviewFeedback && (
// //                     <div className="recommendation ai-explanation" style={{ marginTop: 18 }}>
// //                       <b>AI feedback on your last answer</b>
// //                       <pre className="json-result" style={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>{typeof interviewFeedback === 'string' ? interviewFeedback : JSON.stringify(interviewFeedback, null, 2)}</pre>
// //                     </div>
// //                   )}
// //                   {interviewFinished && (
// //                     <div className="recommendation" style={{ marginTop: 18 }}>
// //                       <b>Interview session complete</b>
// //                       <p>You have completed {interviewHistory.length} answer(s). Review the feedback above and practise again to improve.</p>
// //                     </div>
// //                   )}
// //                 </div>
// //               )}

// //               <div className="three-tip-grid">
// //                 <Tip icon={Target} title="Role-specific questions" text="Practise questions based on your target job role." />
// //                 <Tip icon={BrainCircuit} title="Adaptive difficulty" text="The intended interview flow adjusts question difficulty as you progress." />
// //                 <Tip icon={MessageSquareText} title="Answer feedback" text="Review strengths and improvement areas after each response." />
// //               </div>
// //             </section>
// //           )}

// //           {page === 'email' && (
// //             <section>
// //               <PageHeading eyebrow="HR COMMUNICATION INTELLIGENCE" title="Your HR inbox, organised." description="Track interview invitations, assessments, job offers and recruiter replies in one place." />
// //               <div className="panel resume-panel">
// //                 <div className="panel-heading"><div className="heading-icon purple"><BriefcaseBusiness size={19} /></div><div><h3>Connect your Gmail account</h3><p>Organise recruitment-related emails in one place.</p></div><span className="panel-tag">GMAIL</span></div>
// //                 <div className="privacy-note"><LockKeyhole size={16} /> Read-only Gmail access. Jobify cannot send or delete your emails.</div>
// //                 <div className="email-actions">
// //                   <button className="primary-button" onClick={() => { window.location.href = `${API}/api/email/connect` }}><Link2 size={17} /> Connect Gmail <ArrowRight size={17} /></button>
// //                   <button className="secondary-button" onClick={loadGmail} disabled={gmailLoading}><RotateCcw size={16} /> {gmailLoading ? 'Checking...' : 'Check connection'}</button>
// //                   <button className="secondary-button" onClick={syncGmail} disabled={gmailLoading || !gmailConnected}>Sync emails</button>
// //                 </div>
// //               </div>
// //               {gmailConnected && (
// //                 <>
// //                   <div className="feature-grid">
// //                     <Stat title="Total emails" value={gmailStats?.total_emails ?? gmailEmails.length} />
// //                     <Stat title="Interviews" value={gmailStats?.categories?.INTERVIEW ?? 0} />
// //                     <Stat title="Assessments" value={gmailStats?.categories?.ASSESSMENT ?? 0} />
// //                     <Stat title="Job offers" value={gmailStats?.categories?.JOB_OFFER ?? 0} />
// //                   </div>
// //                   <div className="panel result-panel">
// //                     <h3>Saved HR emails</h3>
// //                     {gmailEmails.length ? gmailEmails.map((email, index) => (
// //                       <div className="indicator" key={email.id || email.message_id || index}>
// //                         <BriefcaseBusiness size={16} />
// //                         <span>{email.subject || email.snippet || 'Email without subject'}</span>
// //                         <span className="panel-tag">{email.category || 'OTHER'}</span>
// //                       </div>
// //                     )) : <p>No saved emails yet. Click Sync emails to fetch messages.</p>}
// //                   </div>
// //                 </>
// //               )}
// //               <div className="three-tip-grid"><Tip icon={BriefcaseBusiness} title="Interview tracking" text="Identify interview invitations and recruiter communication." /><Tip icon={ClipboardCheck} title="Assessment tracking" text="Keep track of job assessments and related messages." /><Tip icon={CheckCircle2} title="Offer tracking" text="Organise job offers and recruitment updates." /></div>
// //             </section>
// //           )}

// //           <footer className="page-footer"><span>© 2026 Jobify</span><span><ShieldCheck size={14} /> Built for safer job searching</span><span className="footer-demo">Connected to local backend</span></footer>
// //         </div>
// //       </main>
// //     </div>
// //   )
// // }

// // function DocumentResult({ data }) {
// //   const analysis = data?.analysis || {}
// //   const extraction = data?.extraction || {}
// //   const riskLevel = String(analysis.risk_level || 'UNKNOWN').toUpperCase()
// //   const riskClass = riskLevel === 'LOW' ? 'risk-low' : riskLevel === 'MEDIUM' ? 'risk-medium' : 'risk-high'
// //   const indicators = Array.isArray(analysis.indicators) ? analysis.indicators : []
// //   const explanation = analysis.gemini_analysis?.explanation

// //   return (
// //     <div className="panel result-panel document-result" style={{ minWidth: 0, maxWidth: '100%', overflow: 'hidden' }}>
// //       <div className="result-header">
// //         <div>
// //           <span className="section-kicker">DOCUMENT SCAN COMPLETE</span>
// //           <h3 style={{ overflowWrap: 'anywhere' }}>{data.filename || 'Uploaded document'}</h3>
// //           <p style={{ marginTop: 6, color: 'var(--muted, #777)' }}>
// //             {extraction.method || 'Document parser'} · {extraction.character_count ?? 0} characters extracted
// //           </p>
// //         </div>
// //         <span className={riskClass}>{riskLevel} RISK</span>
// //       </div>

// //       {analysis.risk_score !== undefined && (
// //         <div className="result-grid" style={{ minWidth: 0 }}>
// //           <div className="score-card">
// //             <div className="score-ring">
// //               <strong>{Number(analysis.risk_score).toFixed(2)}</strong>
// //               <small>/100</small>
// //             </div>
// //             <span className={riskClass}>{riskLevel} RISK</span>
// //             <p>{analysis.category || 'Unclassified'}</p>
// //           </div>
// //           <div className="result-details" style={{ minWidth: 0, overflowWrap: 'anywhere' }}>
// //             <h4>Potential warning signs</h4>
// //             {indicators.length > 0 ? indicators.map((item, index) => (
// //               <div className="indicator" key={`${item.name || 'indicator'}-${index}`}>
// //                 <AlertTriangle size={16} />
// //                 <span style={{ overflowWrap: 'anywhere' }}>{item.name || 'Warning indicator'}</span>
// //                 {item.weight !== undefined && <span className="indicator-weight">{item.weight}</span>}
// //               </div>
// //             )) : <p>No obvious rule-based warning indicators were detected.</p>}
// //             {analysis.recommendation && (
// //               <div className="recommendation">
// //                 <b>Recommended next step</b>
// //                 <p>{analysis.recommendation}</p>
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       )}

// //       {explanation && (
// //         <div className="recommendation ai-explanation" style={{ minWidth: 0, overflowWrap: 'anywhere' }}>
// //           <b>AI explanation</b>
// //           <p style={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere', wordBreak: 'break-word', fontSize: 15, lineHeight: 1.85, color: '#514968' }}>{explanation}</p>
// //           {analysis.gemini_analysis?.provider && <small>AI provider: {analysis.gemini_analysis.provider}</small>}
// //         </div>
// //       )}

// //       {extraction.extracted_text && (
// //         <details style={{ marginTop: 20, minWidth: 0 }}>
// //           <summary style={{ cursor: 'pointer', fontWeight: 600, padding: '12px 0' }}>
// //             View extracted document text
// //           </summary>
// //           <div
// //             style={{
// //               boxSizing: 'border-box',
// //               width: '100%',
// //               maxWidth: '100%',
// //               maxHeight: 260,
// //               overflowY: 'auto',
// //               overflowX: 'hidden',
// //               whiteSpace: 'pre-wrap',
// //               overflowWrap: 'anywhere',
// //               wordBreak: 'break-word',
// //               background: 'var(--surface-soft, #f7f6fb)',
// //               border: '1px solid var(--border, #e8e4f2)',
// //               borderRadius: 12,
// //               padding: 16,
// //               fontSize: 13,
// //               lineHeight: 1.65
// //             }}
// //           >
// //             {extraction.extracted_text}
// //           </div>
// //         </details>
// //       )}

// //       <div className="demo-disclaimer" style={{ overflowWrap: 'anywhere' }}>
// //         Automated screening is a decision-support aid, not proof that a document or employer is fraudulent or legitimate.
// //       </div>
// //     </div>
// //   )
// // }

// // function ResultObject({ title, data }) {
// //   return (
// //     <div className="panel result-panel">
// //       <span className="section-kicker">BACKEND RESPONSE</span>
// //       <h3>{title}</h3>
// //       <pre className="json-result" style={{ maxWidth: "100%", overflowX: "auto", whiteSpace: "pre-wrap", overflowWrap: "anywhere", wordBreak: "break-word" }}>{JSON.stringify(data, null, 2)}</pre>
// //     </div>
// //   )
// // }

// // function Stat({ title, value }) {
// //   return <div className="panel"><h3>{title}</h3><h2>{value}</h2></div>
// // }

// // function PageHeading({ eyebrow, title, description }) {
// //   return <div className="page-heading"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{description}</p></div><div className="heading-badge"><ShieldCheck size={17} /> Safety-first tools</div></div>
// // }

// // function Tip({ icon: Icon, title, text }) {
// //   return <div className="tip-card"><div className="tip-icon"><Icon size={18} /></div><b>{title}</b><p>{text}</p></div>
// // }

// // function Overview({ setPage }) {
// //   return (
// //     <section>
// //       <div className="hero-panel">
// //         <div className="hero-copy">
// //           <div className="eyebrow"><span className="eyebrow-dot" /> YOUR CAREER, WITH MORE CONFIDENCE</div>
// //           <h1>Make your next career move<br /><span className="gradient-text">a safer one.</span></h1>
// //           <p className="hero-description">Spot suspicious job offers, review documents, and find your next skill to build — all in one workspace.</p>
// //           <div className="hero-actions"><button className="primary-button" onClick={() => setPage('scan')}><ScanSearch size={17} /> Check a job message <ArrowRight size={17} /></button><button className="secondary-button" onClick={() => setPage('resume')}>Match my resume <ArrowUpRight size={16} /></button></div>
// //           <div className="hero-proof"><span><CheckCircle2 size={15} /> Explainable checks</span><span><CheckCircle2 size={15} /> Career-focused tools</span></div>
// //         </div>
// //         <div className="hero-visual" aria-hidden="true"><div className="visual-ring ring-one" /><div className="visual-ring ring-two" /><div className="visual-ring ring-three" /><div className="visual-orbit orbit-one"><span className="orbit-ball ball-one" /><span className="orbit-ball ball-two" /></div><div className="visual-orbit orbit-two"><span className="orbit-ball ball-three" /><span className="orbit-ball ball-four" /></div><div className="visual-core"><ShieldCheck size={56} strokeWidth={1.6} /></div><div className="float-chip chip-top"><span className="chip-dot green" /> Safety check <b>Ready</b></div><div className="float-chip chip-bottom"><Sparkles size={14} /> Explainable AI</div></div>
// //       </div>
// //       <div className="section-title-row"><div><div className="eyebrow">YOUR WORKSPACE</div><h2>Tools for every step</h2><p>Practical checks to help you make informed career decisions.</p></div><span className="section-count">06 TOOLS</span></div>
// //       <div className="feature-grid">
// //         <Feature icon={ScanSearch} color="purple" tag="CORE TOOL" title="Scam detector" text="Check a suspicious message for warning signs and a risk explanation." action="Check a message" onClick={() => setPage('scan')} />
// //         <Feature icon={FileSearch} color="blue" title="Document scan" text="Upload a job offer document for text extraction and review." action="Scan a document" onClick={() => setPage('document')} />
// //         <Feature icon={FileText} color="pink" title="Resume matcher" text="Compare your resume against a target job description." action="Match resume" onClick={() => setPage('resume')} />
// //         <Feature icon={GraduationCap} color="peach" title="Skill coach" text="Turn missing skills into a structured learning roadmap." action="Plan learning" onClick={() => setPage('coach')} />
// //         <Feature icon={ClipboardCheck} color="blue" title="AI mock interview" text="Practise role-specific HR and technical interview questions." action="Start practising" onClick={() => setPage('interview')} />
// //         <Feature icon={BriefcaseBusiness} color="purple" title="HR email intelligence" text="Organise interviews, assessments and offers from Gmail." action="Connect Gmail" onClick={() => setPage('email')} />
// //       </div>
// //       <div className="bottom-grid">
// //         <div className="panel trust-panel"><div className="trust-icon"><ShieldCheck size={20} /></div><div><h3>Stay in control of your career</h3><p>Use these tools as a second opinion. Verify employers through independent, trusted sources before sharing money or personal information.</p></div><button className="text-button" onClick={() => setPage('scan')}>Start a check <ArrowRight size={15} /></button></div>
// //         <div className="panel quick-panel"><div className="quick-heading"><div><h3>Before you apply</h3><p>A quick safety checklist</p></div><ClipboardCheck size={19} /></div><div className="quick-item"><CircleCheck size={16} /> Verify the company's official website</div><div className="quick-item"><CircleCheck size={16} /> Never pay to secure a job</div><div className="quick-item"><CircleCheck size={16} /> Be cautious with urgent requests</div></div>
// //       </div>
// //     </section>
// //   )
// // }

// // function Feature({ icon: Icon, color, tag, title, text, action, onClick }) {
// //   return <button className="feature-card" onClick={onClick}><div className={`feature-icon ${color}`}><Icon size={20} /></div><div className="feature-meta">{tag || 'CAREER TOOL'}</div><h3>{title}</h3><p>{text}</p><span className="feature-action">{action}<ArrowRight size={15} /></span></button>
// // }

// // createRoot(document.getElementById('root')).render(<App />)
// import React, { useMemo, useState } from 'react'

// import { createRoot } from 'react-dom/client'

// import {

//   ShieldCheck, LayoutDashboard, ScanSearch, FileSearch, FileText, GraduationCap,

//   Settings, Bell, ChevronDown, ArrowUpRight, ArrowRight, UploadCloud, Link2,

//   CheckCircle2, AlertTriangle, CircleHelp, Sparkles, Menu, X, LockKeyhole,

//   ShieldAlert, ClipboardCheck, BriefcaseBusiness, Clock3, FileCheck2, Target,

//   Lightbulb, CircleCheck, RotateCcw, BrainCircuit, MessageSquareText

// } from 'lucide-react'

// import './styles.css'

// import './jobify-accessibility.css'



// const API = 'http://127.0.0.1:8000'



// const navItems = [

//   { id: 'overview', label: 'Overview', icon: LayoutDashboard, group: 'WORKSPACE' },

//   { id: 'scan', label: 'Scam detector', icon: ScanSearch, group: 'WORKSPACE' },

//   { id: 'document', label: 'Document scan', icon: FileSearch, group: 'WORKSPACE' },

//   { id: 'resume', label: 'Resume matcher', icon: FileText, group: 'CAREER TOOLS' },

//   { id: 'coach', label: 'Skill coach', icon: GraduationCap, group: 'CAREER TOOLS' },

//   { id: 'interview', label: 'AI mock interview', icon: ClipboardCheck, group: 'CAREER TOOLS' },

//   { id: 'email', label: 'HR email intelligence', icon: BriefcaseBusiness, group: 'CAREER TOOLS' },

// ]



// async function readResponse(response) {

//   const data = await response.json().catch(() => ({}))

//   if (!response.ok) {

//     const detail = data.detail

//     throw new Error(typeof detail === 'string' ? detail : `Request failed (${response.status})`)

//   }

//   return data

// }



// function App() {

//   const [page, setPage] = useState('overview')

//   const [mobileNav, setMobileNav] = useState(false)

//   const [message, setMessage] = useState('')

//   const [documentFile, setDocumentFile] = useState(null)

//   const [resume, setResume] = useState(null)

//   const [jobDescription, setJobDescription] = useState('')

//   const [targetJob, setTargetJob] = useState('Frontend Developer')

//   const [skills, setSkills] = useState('React, TypeScript, Testing')

//   const [result, setResult] = useState(null)

//   const [documentResult, setDocumentResult] = useState(null)

//   const [resumeResult, setResumeResult] = useState(null)

//   const [roadmapResult, setRoadmapResult] = useState(null)

//   const [notice, setNotice] = useState('')

//   const [showProfile, setShowProfile] = useState(false)

//   const [busy, setBusy] = useState(false)

//   const [gmailConnected, setGmailConnected] = useState(false)

//   const [gmailStats, setGmailStats] = useState(null)

//   const [gmailEmails, setGmailEmails] = useState([])

//   const [gmailLoading, setGmailLoading] = useState(false)

//   const [interviewType, setInterviewType] = useState('both')

//   const [interviewDifficulty, setInterviewDifficulty] = useState('adaptive')

//   const [interviewSession, setInterviewSession] = useState(null)

//   const [interviewQuestion, setInterviewQuestion] = useState(null)

//   const [interviewAnswer, setInterviewAnswer] = useState('')

//   const [interviewFeedback, setInterviewFeedback] = useState(null)

//   const [interviewHistory, setInterviewHistory] = useState([])

//   const [interviewFinished, setInterviewFinished] = useState(false)



//   const title = navItems.find(item => item.id === page)?.label || 'Overview'

//   const wordCount = useMemo(

//     () => message.trim() ? message.trim().split(/\s+/).length : 0,

//     [message]

//   )



//   function changePage(id) {

//     setPage(id)

//     setMobileNav(false)

//     setNotice('')

//   }



//   async function demoScan() {

//     if (message.trim().length < 10) {

//       setNotice('Enter at least 10 characters to analyze.')

//       return

//     }

//     setBusy(true)

//     setNotice('Analyzing message with Jobify AI...')

//     setResult(null)

//     try {

//       const response = await fetch(`${API}/api/analyze`, {

//         method: 'POST',

//         headers: { 'Content-Type': 'application/json' },

//         body: JSON.stringify({ text: message })

//       })

//       const data = await readResponse(response)

//       setResult({

//         score: data.risk_score,

//         level: data.risk_level || data.risk || 'UNKNOWN',

//         category: data.category || 'UNCLASSIFIED',

//         ruleScore: data.rule_score,

//         mlScore: data.ml_score,

//         indicators: Array.isArray(data.indicators) ? data.indicators : [],

//         recommendation: data.recommendation || 'Verify the employer independently.',

//         gemini_analysis: data.gemini_analysis,
//         explainability: data.explainability || null

//       })

//       setNotice('Analysis completed successfully.')

//     } catch (error) {

//       console.error('Jobify analysis error:', error)

//       setNotice(error.message || 'Could not connect to the backend.')

//     } finally {

//       setBusy(false)

//     }

//   }



//   async function analyzeDocument() {

//     if (!documentFile) {

//       setNotice('Choose a document first.')

//       return

//     }

//     setBusy(true)

//     setDocumentResult(null)

//     setNotice('Analyzing document...')

//     try {

//       const formData = new FormData()

//       formData.append('file', documentFile)

//       const response = await fetch(`${API}/api/document/analyze`, {

//         method: 'POST',

//         body: formData

//       })

//       const data = await readResponse(response)

//       setDocumentResult(data)

//       setNotice('Document analysis completed.')

//     } catch (error) {

//       console.error('Document analysis error:', error)

//       setNotice(error.message || 'Document analysis failed.')

//     } finally {

//       setBusy(false)

//     }

//   }



//   async function matchResume() {

//     if (!resume) {

//       setNotice('Upload your resume first.')

//       return

//     }

//     if (!jobDescription.trim()) {

//       setNotice('Enter a job description first.')

//       return

//     }

//     setBusy(true)

//     setResumeResult(null)

//     setNotice('Matching your resume...')

//     try {

//       const formData = new FormData()

//       formData.append('file', resume)

//       formData.append('job_description', jobDescription)

//       const response = await fetch(`${API}/api/resume/match`, {

//         method: 'POST',

//         body: formData

//       })

//       const data = await readResponse(response)

//       setResumeResult(data)

//       setNotice('Resume matching completed.')

//     } catch (error) {

//       console.error('Resume matching error:', error)

//       setNotice(error.message || 'Resume matching failed.')

//     } finally {

//       setBusy(false)

//     }

//   }



//   async function generateRoadmap() {

//     const missingSkills = skills.split(',').map(skill => skill.trim()).filter(Boolean)

//     if (!targetJob.trim()) {

//       setNotice('Enter your target job role.')

//       return

//     }

//     if (!missingSkills.length) {

//       setNotice('Enter at least one skill.')

//       return

//     }

//     setBusy(true)

//     setRoadmapResult(null)

//     setNotice('Generating your learning roadmap...')

//     try {

//       const response = await fetch(`${API}/api/skill-coach/roadmap`, {

//         method: 'POST',

//         headers: { 'Content-Type': 'application/json' },

//         body: JSON.stringify({ target_job: targetJob, missing_skills: missingSkills })

//       })

//       const data = await readResponse(response)

//       setRoadmapResult(data)

//       setNotice('Your learning roadmap is ready.')

//     } catch (error) {

//       console.error('Roadmap error:', error)

//       setNotice(error.message || 'Roadmap generation failed.')

//     } finally {

//       setBusy(false)

//     }

//   }



//   async function startInterview() {

//     if (!targetJob.trim()) {

//       setNotice('Enter the role you want to practise for.')

//       return

//     }

//     setBusy(true)

//     setInterviewSession(null)

//     setInterviewQuestion(null)

//     setInterviewAnswer('')

//     setInterviewFeedback(null)

//     setInterviewHistory([])

//     setInterviewFinished(false)

//     setNotice('Preparing your AI mock interview...')

//     try {

//       const data = await readResponse(await fetch(`${API}/api/interview/start`, {

//         method: 'POST',

//         headers: { 'Content-Type': 'application/json' },

//         body: JSON.stringify({

//           target_job: targetJob,

//           interview_type: interviewType,

//           difficulty: interviewDifficulty

//         })

//       }))

//       const question = data.current_question || data.question || data.first_question

//       setInterviewSession(data.session_id || data.id || null)

//       setInterviewQuestion(question)

//       setNotice(question ? 'Your mock interview is ready. Answer the first question.' : 'Interview started, but the backend did not return a question.')

//     } catch (error) {

//       console.error('Interview start error:', error)

//       setNotice(error.message || 'Could not start the mock interview. The interview backend may not be connected yet.')

//     } finally {

//       setBusy(false)

//     }

//   }



//   async function submitInterviewAnswer() {

//     if (!interviewSession || !interviewQuestion) {

//       setNotice('Start a mock interview first.')

//       return

//     }

//     if (!interviewAnswer.trim()) {

//       setNotice('Write your answer before submitting.')

//       return

//     }

//     setBusy(true)

//     setNotice('Evaluating your answer...')

//     try {

//       const data = await readResponse(await fetch(`${API}/api/interview/answer`, {

//         method: 'POST',

//         headers: { 'Content-Type': 'application/json' },

//         body: JSON.stringify({

//           session_id: interviewSession,

//           question_id: interviewQuestion.id || interviewQuestion.question_id || null,

//           question: interviewQuestion.question || interviewQuestion.text || interviewQuestion.prompt || '',

//           answer: interviewAnswer

//         })

//       }))

//       const feedback = data.feedback || data.evaluation || data.result || data

//       setInterviewHistory(previous => [...previous, {

//         question: interviewQuestion.question || interviewQuestion.text || interviewQuestion.prompt || '',

//         answer: interviewAnswer,

//         feedback

//       }])

//       setInterviewFeedback(feedback)

//       const nextQuestion = data.next_question || data.current_question

//       setInterviewAnswer('')

//       if (nextQuestion) {

//         setInterviewQuestion(nextQuestion)

//         setNotice('Answer evaluated. Your next question is ready.')

//       } else if (data.completed || data.finished || data.is_complete) {

//         setInterviewQuestion(null)

//         setInterviewFinished(true)

//         setNotice('Mock interview completed. Review your feedback below.')

//       } else {

//         setInterviewQuestion(null)

//         setInterviewFinished(true)

//         setNotice('No further question was returned. Review your feedback below.')

//       }

//     } catch (error) {

//       console.error('Interview answer error:', error)

//       setNotice(error.message || 'Could not evaluate your answer.')

//     } finally {

//       setBusy(false)

//     }

//   }



//   function resetInterview() {

//     setInterviewSession(null)

//     setInterviewQuestion(null)

//     setInterviewAnswer('')

//     setInterviewFeedback(null)

//     setInterviewHistory([])

//     setInterviewFinished(false)

//     setNotice('')

//   }



//   async function loadGmail() {

//     setGmailLoading(true)

//     setNotice('Checking Gmail connection...')

//     try {

//       const status = await readResponse(await fetch(`${API}/api/email/status`))

//       const connected = Boolean(status.connected)

//       setGmailConnected(connected)

//       if (!connected) {

//         setGmailStats(null)

//         setGmailEmails([])

//         setNotice('Gmail is not connected yet. Connect your account to continue.')

//         return

//       }

//       const [dashboard, saved] = await Promise.all([

//         fetch(`${API}/api/email/dashboard`).then(readResponse),

//         fetch(`${API}/api/email/saved`).then(readResponse)

//       ])

//       setGmailStats(dashboard.dashboard || dashboard)

//       setGmailEmails(Array.isArray(saved.emails) ? saved.emails : [])

//       setNotice('Gmail connected. Your saved messages are loaded.')

//     } catch (error) {

//       console.error('Gmail loading error:', error)

//       setNotice(error.message || 'Could not load Gmail data.')

//     } finally {

//       setGmailLoading(false)

//     }

//   }



//   async function syncGmail() {

//     setGmailLoading(true)

//     setNotice('Syncing Gmail messages...')

//     try {

//       await readResponse(await fetch(`${API}/api/email/sync`, { method: 'POST' }))

//       await loadGmail()

//       setNotice('Gmail sync completed.')

//     } catch (error) {

//       setNotice(error.message || 'Gmail sync failed.')

//     } finally {

//       setGmailLoading(false)

//     }

//   }



//   function resetResult() {

//     setResult(null)

//     setNotice('')

//   }



//   return (

//     <div className="app-shell">

//       <aside className={`sidebar ${mobileNav ? 'sidebar-open' : ''}`}>

//         <div className="brand-row">

//           <div className="brand-mark"><ShieldCheck size={23} strokeWidth={2.2} /></div>

//           <div className="brand-name">Jobify<span>.</span><small>CAREER SAFETY</small></div>

//           <button className="icon-button mobile-close" onClick={() => setMobileNav(false)} aria-label="Close menu"><X size={19} /></button>

//         </div>

//         <div className="workspace-pill"><span className="workspace-dot" /> Personal workspace <ChevronDown size={14} /></div>

//         {['WORKSPACE', 'CAREER TOOLS'].map(group => (

//           <div className="nav-group" key={group}>

//             <div className="nav-label">{group}</div>

//             {navItems.filter(item => item.group === group).map(item => {

//               const Icon = item.icon

//               return (

//                 <button key={item.id} className={`nav-item ${page === item.id ? 'active' : ''}`} onClick={() => changePage(item.id)}>

//                   <Icon size={18} /><span>{item.label}</span>{item.id === 'scan' && <span className="nav-new">AI</span>}

//                 </button>

//               )

//             })}

//           </div>

//         ))}

//         <div className="sidebar-bottom">

//           <div className="security-mini">

//             <div className="security-mini-icon"><LockKeyhole size={17} /></div>

//             <div><b>Your safety comes first</b><span>Review every opportunity carefully.</span></div>

//           </div>

//           <button className="nav-item settings-item" onClick={() => setNotice('Settings will be available in a future version.')}><Settings size={18} /><span>Settings</span></button>

//           <div className="sidebar-user">

//             <div className="avatar">JD</div><div className="user-meta"><b>Job Seeker</b><span>Free workspace</span></div>

//             <button className="icon-button" aria-label="Profile menu" onClick={() => setShowProfile(!showProfile)}><ChevronDown size={16} /></button>

//             {showProfile && <div className="profile-popover">Demo profile<br /><small>No account connected</small></div>}

//           </div>

//         </div>

//       </aside>



//       {mobileNav && <button className="scrim" onClick={() => setMobileNav(false)} aria-label="Close navigation" />}

//       <main className="main-area">

//         <header className="topbar">

//           <div className="topbar-left">

//             <button className="icon-button mobile-menu" onClick={() => setMobileNav(true)} aria-label="Open menu"><Menu size={20} /></button>

//             <div className="breadcrumbs">Workspace <span>/</span> <b>{title}</b></div>

//           </div>

//           <div className="topbar-actions">

//             <div className="demo-badge"><span /> Backend connected locally</div>

//             <button className="icon-button notification" aria-label="Notifications" onClick={() => setNotice('You are all caught up.')}><Bell size={18} /><i /></button>

//             <div className="top-avatar">JD</div>

//           </div>

//         </header>



//         <div className="page-content">

//           {notice && <div className="notice global-notice"><CircleHelp size={16} />{notice}</div>}



//           {page === 'overview' && <Overview setPage={changePage} />}



//           {page === 'scan' && (

//             <section>

//               <PageHeading eyebrow="AI SECURITY TOOL" title="Check a job message" description="Review suspicious job offers, recruiter messages, or job descriptions before you respond." />

//               <div className="tool-layout">

//                 <div className="panel scan-panel">

//                   <div className="panel-heading">

//                     <div className="heading-icon purple"><ScanSearch size={19} /></div>

//                     <div><h3>Message analysis</h3><p>Paste the text you want to check.</p></div>

//                     <span className="panel-tag">Up to 5,000 characters</span>

//                   </div>

//                   <label className="field-label" htmlFor="message">Message or job offer</label>

//                   <textarea id="message" className="text-area" maxLength={5000} value={message} onChange={event => { setMessage(event.target.value); setNotice('') }} placeholder="Paste the recruiter message, job offer, or suspicious text here…" />

//                   <div className="input-foot"><span>Do not include passwords or private account details.</span><span>{message.length}/5,000 · {wordCount} words</span></div>

//                   <div className="sample-row">

//                     <span>Try an example:</span>

//                     <button className="sample-chip" onClick={() => setMessage('Congratulations! You have been selected for a remote job. Pay a refundable registration fee today to secure your position.')}>Urgent payment request</button>

//                     <button className="sample-chip" onClick={() => setMessage('We would like to schedule an interview for the software developer position. Please review the job description and reply with your available times.')}>Interview invitation</button>

//                   </div>

//                   <button className="primary-button full-button" onClick={demoScan} disabled={busy}><Sparkles size={17} /> {busy ? 'Analyzing...' : 'Analyze with Jobify AI'} <ArrowRight size={17} /></button>

//                   <div className="privacy-note"><LockKeyhole size={15} /> Message text is sent to your local Jobify backend for analysis.</div>

//                 </div>

//                 <div className="panel side-info-panel">

//                   <div className="info-illustration"><div className="illustration-orbit orbit-a" /><div className="illustration-orbit orbit-b" /><div className="illustration-core"><ShieldCheck size={42} /></div><span className="spark spark-a" /><span className="spark spark-b" /></div>

//                   <h3>Look beyond the wording</h3>

//                   <p>Scam messages can look professional. Check payment requests, recruiter identity, and links before sharing information.</p>

//                   <div className="check-list"><div><CheckCircle2 size={17} /> Unexpected fees or deposits</div><div><CheckCircle2 size={17} /> Pressure to act immediately</div><div><CheckCircle2 size={17} /> Unverified company details</div></div>

//                   <div className="info-footer"><ShieldAlert size={17} /><span>Even a low-risk result cannot guarantee that a job is legitimate.</span></div>

//                 </div>

//               </div>



//               {result && (

//                 <div className="panel result-panel">

//                   <div className="result-header">

//                     <div><span className="section-kicker">LIVE AI ANALYSIS</span><h3>Job risk assessment</h3></div>

//                     <button className="text-button" onClick={resetResult}><RotateCcw size={15} /> Clear result</button>

//                   </div>

//                   <div className="result-grid">

//                     <div className="score-card">

//                       <div className="score-ring"><strong>{Number(result.score ?? 0).toFixed(2)}</strong><small>/100</small></div>

//                       <span className={result.level === 'LOW' ? 'risk-low' : result.level === 'MEDIUM' ? 'risk-medium' : 'risk-high'}>{result.level} RISK</span>

//                       <p>{result.category}</p>

//                       <small>Rule score: {result.ruleScore ?? '—'} · ML score: {result.mlScore ?? '—'}</small>

//                     </div>

//                     <div className="result-details">

//                       <h4>Potential warning signs</h4>

//                       {result.indicators.length ? result.indicators.map((item, index) => (

//                         <div className="indicator" key={`${item.name}-${index}`}><AlertTriangle size={16} /><span>{item.name}</span><span className="indicator-weight">{item.weight}</span></div>

//                       )) : <p>No rule-based warning indicators were returned. Still verify the employer independently.</p>}

//                       <div className="recommendation"><b>Recommended next step</b><p>{result.recommendation}</p></div>

//                     </div>

//                   </div>

//                   {result.explainability && (
//                       <ScamExplainability data={result.explainability} />
//                     )}
//                     {result.gemini_analysis?.enabled && (

//                     <div className="recommendation ai-explanation">

//                       <b>AI investigation and safety advice</b>

//                       <p style={{ whiteSpace: 'pre-wrap', lineHeight: 1.7 }}>{result.gemini_analysis.explanation}</p>

//                       <small>AI provider: {result.gemini_analysis.provider}</small>

//                     </div>

//                   )}

//                   <div className="demo-disclaimer">Generated by Jobify's machine-learning and AI services. This is a screening aid, not proof of fraud or legitimacy.</div>

//                 </div>

//               )}

//             </section>

//           )}



//           {page === 'document' && (

//             <section>

//               <PageHeading eyebrow="DOCUMENT CHECK" title="Scan a job document" description="Upload a PDF, DOCX, or supported image of a job offer for text extraction and scam analysis." />

//               <div className="panel document-panel">

//                 <div className="panel-heading"><div className="heading-icon purple"><FileSearch size={19} /></div><div><h3>Upload a document</h3><p>Supported formats depend on the backend document parser.</p></div></div>

//                 <label className={`drop-zone ${documentFile ? 'has-file' : ''}`}>

//                   <input type="file" accept=".pdf,.docx,.png,.jpg,.jpeg" onChange={event => { setDocumentFile(event.target.files?.[0] || null); setDocumentResult(null); setNotice('') }} />

//                   <div className="upload-icon"><UploadCloud size={26} /></div>

//                   <b>{documentFile ? documentFile.name : 'Choose a file or drag it here'}</b>

//                   <span>{documentFile ? `${(documentFile.size / 1024 / 1024).toFixed(2)} MB · selected` : 'PDF, DOCX, PNG, JPG or JPEG'}</span>

//                   <span className="browse-button">{documentFile ? 'Choose another file' : 'Browse files'}</span>

//                 </label>

//                 <button className="primary-button" onClick={analyzeDocument} disabled={busy}><FileSearch size={17} /> {busy ? 'Analyzing...' : 'Analyze document'}</button>

//                 <div className="privacy-note"><LockKeyhole size={15} /> The selected file is uploaded to your local backend for processing.</div>

//               </div>

//               {documentResult && <DocumentResult data={documentResult} />}

//               <div className="three-tip-grid"><Tip icon={FileCheck2} title="Readable text" text="Use a clear document with selectable text when possible." /><Tip icon={ShieldCheck} title="Verify the source" text="Check the sender and employer independently." /><Tip icon={Clock3} title="Review carefully" text="Do not rush into paying fees or sharing documents." /></div>

//             </section>

//           )}



//           {page === 'resume' && (

//             <section>

//               <PageHeading eyebrow="CAREER MATCHING" title="Match your resume to a role" description="Compare a resume with a job description to review text similarity and skill coverage." />

//               <div className="panel resume-panel">

//                 <div className="panel-heading"><div className="heading-icon purple"><FileText size={19} /></div><div><h3>Resume and job details</h3><p>Upload a resume and paste the role description.</p></div><span className="panel-tag">Maximum file size: 5 MB</span></div>

//                 <label className="field-label">Resume file</label>

//                 <label className={`resume-drop ${resume ? 'has-file' : ''}`}>

//                   <input type="file" accept=".pdf,.docx" onChange={event => { setResume(event.target.files?.[0] || null); setResumeResult(null); setNotice('') }} />

//                   <div className="upload-icon small"><UploadCloud size={22} /></div>

//                   <div><b>{resume ? resume.name : 'Upload your resume'}</b><span>{resume ? `${(resume.size / 1024 / 1024).toFixed(2)} MB selected` : 'PDF or DOCX'}</span></div>

//                   <span className="browse-button">{resume ? 'Change' : 'Browse'}</span>

//                 </label>

//                 <label className="field-label" htmlFor="job-desc">Job description</label>

//                 <textarea id="job-desc" className="text-area job-textarea" maxLength={10000} value={jobDescription} onChange={event => setJobDescription(event.target.value)} placeholder="Paste the target job description, required skills, and responsibilities…" />

//                 <div className="input-foot"><span>Include required skills for a useful comparison.</span><span>{jobDescription.length}/10,000</span></div>

//                 <button className="primary-button" onClick={matchResume} disabled={busy}><Target size={17} /> {busy ? 'Matching...' : 'Match resume'}</button>

//                 <div className="privacy-note"><LockKeyhole size={15} /> Your resume and job description are uploaded to your local backend.</div>

//               </div>

//               {resumeResult && <ResultObject title="Resume match result" data={resumeResult} />}

//               <div className="three-tip-grid"><Tip icon={Target} title="Text similarity" text="Estimate how closely resume content aligns with the role." /><Tip icon={CheckCircle2} title="Matched skills" text="Identify skills mentioned in both documents." /><Tip icon={Lightbulb} title="Skill gaps" text="Use missing skills to plan your next learning steps." /></div>

//             </section>

//           )}



//           {page === 'coach' && (

//             <section>

//               <PageHeading eyebrow="PERSONALISED LEARNING" title="Build a skill roadmap" description="Enter a target role and skills you want to improve to generate a learning roadmap." />

//               <div className="coach-layout">

//                 <div className="panel coach-panel">

//                   <div className="panel-heading"><div className="heading-icon purple"><GraduationCap size={19} /></div><div><h3>Your learning goal</h3><p>Use the role and skill gaps from your resume review.</p></div></div>

//                   <label className="field-label" htmlFor="target-job">Target job role</label>

//                   <input id="target-job" className="text-input" maxLength={150} value={targetJob} onChange={event => setTargetJob(event.target.value)} placeholder="e.g. Frontend Developer" />

//                   <label className="field-label" htmlFor="missing-skills">Skills to improve</label>

//                   <textarea id="missing-skills" className="text-area skills-textarea" value={skills} onChange={event => setSkills(event.target.value)} placeholder="Enter missing skills separated by commas…" />

//                   <div className="input-foot"><span>Enter skills separated by commas.</span><span>{skills.split(',').map(skill => skill.trim()).filter(Boolean).length} skills</span></div>

//                   <button className="primary-button" onClick={generateRoadmap} disabled={busy}><Sparkles size={17} /> {busy ? 'Generating...' : 'Generate learning roadmap'}</button>

//                 </div>

//                 <div className="panel roadmap-preview">

//                   <div className="roadmap-top"><div className="heading-icon peach"><Lightbulb size={20} /></div><span className="panel-tag">LEARNING PLAN</span></div>

//                   <h3>A clear path to your next role</h3>

//                   {roadmapResult ? <ResultObject title="Generated roadmap" data={roadmapResult} /> : <p>Your personalised roadmap will appear here after generation.</p>}

//                 </div>

//               </div>

//             </section>

//           )}



//           {page === 'interview' && (

//             <section>

//               <PageHeading

//                 eyebrow="AI INTERVIEW ARENA"

//                 title="Practise before the real interview"

//                 description="Take an adaptive mock interview, answer one question at a time, and receive feedback on your responses."

//               />

//               {!interviewSession && (

//                 <div className="panel resume-panel">

//                   <div className="panel-heading">

//                     <div className="heading-icon purple"><ClipboardCheck size={19} /></div>

//                     <div><h3>Set up your mock interview</h3><p>Choose the role and interview format you want to practise.</p></div>

//                     <span className="panel-tag">AI PRACTICE</span>

//                   </div>

//                   <label className="field-label" htmlFor="interview-role">Target job role</label>

//                   <input id="interview-role" className="text-input" maxLength={150} value={targetJob} onChange={event => setTargetJob(event.target.value)} placeholder="e.g. Python Developer" />

//                   <label className="field-label">Interview type</label>

//                   <div className="sample-row">

//                     <button className={`sample-chip ${interviewType === 'technical' ? 'selected' : ''}`} onClick={() => setInterviewType('technical')}>Technical</button>

//                     <button className={`sample-chip ${interviewType === 'hr' ? 'selected' : ''}`} onClick={() => setInterviewType('hr')}>HR / Behavioural</button>

//                     <button className={`sample-chip ${interviewType === 'both' ? 'selected' : ''}`} onClick={() => setInterviewType('both')}>Both</button>

//                   </div>

//                   <label className="field-label">Difficulty</label>

//                   <div className="sample-row">

//                     <button className={`sample-chip ${interviewDifficulty === 'easy' ? 'selected' : ''}`} onClick={() => setInterviewDifficulty('easy')}>Beginner</button>

//                     <button className={`sample-chip ${interviewDifficulty === 'medium' ? 'selected' : ''}`} onClick={() => setInterviewDifficulty('medium')}>Intermediate</button>

//                     <button className={`sample-chip ${interviewDifficulty === 'hard' ? 'selected' : ''}`} onClick={() => setInterviewDifficulty('hard')}>Advanced</button>

//                     <button className={`sample-chip ${interviewDifficulty === 'adaptive' ? 'selected' : ''}`} onClick={() => setInterviewDifficulty('adaptive')}>Adaptive</button>

//                   </div>

//                   <button className="primary-button" onClick={startInterview} disabled={busy}>

//                     <Sparkles size={17} /> {busy ? 'Preparing...' : 'Start AI mock interview'} <ArrowRight size={17} />

//                   </button>

//                   <div className="privacy-note"><LockKeyhole size={15} /> Your answers are sent to the Jobify backend for evaluation.</div>

//                 </div>

//               )}



//               {interviewSession && (

//                 <div className="panel result-panel">

//                   <div className="result-header">

//                     <div><span className="section-kicker">LIVE MOCK INTERVIEW</span><h3>{targetJob}</h3></div>

//                     <button className="text-button" onClick={resetInterview}><RotateCcw size={15} /> End / restart</button>

//                   </div>

//                   {interviewQuestion && (

//                     <div className="coach-panel">

//                       <span className="panel-tag">QUESTION {interviewHistory.length + 1}</span>

//                       <h3 style={{ marginTop: 12 }}>{interviewQuestion.question || interviewQuestion.text || interviewQuestion.prompt || 'The interview backend returned an empty question.'}</h3>

//                       {interviewQuestion.category && <span className="panel-tag">{interviewQuestion.category}</span>}

//                       <label className="field-label" htmlFor="interview-answer">Your answer</label>

//                       <textarea id="interview-answer" className="text-area" rows={7} value={interviewAnswer} onChange={event => setInterviewAnswer(event.target.value)} placeholder="Structure your response clearly. Explain your reasoning and give examples where possible." />

//                       <button className="primary-button" onClick={submitInterviewAnswer} disabled={busy || !interviewAnswer.trim()}>

//                         <Sparkles size={17} /> {busy ? 'Evaluating...' : 'Submit answer'}

//                       </button>

//                     </div>

//                   )}

//                   {interviewFeedback && (

//                     <div className="recommendation ai-explanation" style={{ marginTop: 18 }}>

//                       <b>AI feedback on your last answer</b>

//                       <pre className="json-result" style={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>{typeof interviewFeedback === 'string' ? interviewFeedback : JSON.stringify(interviewFeedback, null, 2)}</pre>

//                     </div>

//                   )}

//                   {interviewFinished && (

//                     <div className="recommendation" style={{ marginTop: 18 }}>

//                       <b>Interview session complete</b>

//                       <p>You have completed {interviewHistory.length} answer(s). Review the feedback above and practise again to improve.</p>

//                     </div>

//                   )}

//                 </div>

//               )}



//               <div className="three-tip-grid">

//                 <Tip icon={Target} title="Role-specific questions" text="Practise questions based on your target job role." />

//                 <Tip icon={BrainCircuit} title="Adaptive difficulty" text="The intended interview flow adjusts question difficulty as you progress." />

//                 <Tip icon={MessageSquareText} title="Answer feedback" text="Review strengths and improvement areas after each response." />

//               </div>

//             </section>

//           )}



//           {page === 'email' && (

//             <section>

//               <PageHeading eyebrow="HR COMMUNICATION INTELLIGENCE" title="Your HR inbox, organised." description="Track interview invitations, assessments, job offers and recruiter replies in one place." />

//               <div className="panel resume-panel">

//                 <div className="panel-heading"><div className="heading-icon purple"><BriefcaseBusiness size={19} /></div><div><h3>Connect your Gmail account</h3><p>Organise recruitment-related emails in one place.</p></div><span className="panel-tag">GMAIL</span></div>

//                 <div className="privacy-note"><LockKeyhole size={16} /> Read-only Gmail access. Jobify cannot send or delete your emails.</div>

//                 <div className="email-actions">

//                   <button className="primary-button" onClick={() => { window.location.href = `${API}/api/email/connect` }}><Link2 size={17} /> Connect Gmail <ArrowRight size={17} /></button>

//                   <button className="secondary-button" onClick={loadGmail} disabled={gmailLoading}><RotateCcw size={16} /> {gmailLoading ? 'Checking...' : 'Check connection'}</button>

//                   <button className="secondary-button" onClick={syncGmail} disabled={gmailLoading || !gmailConnected}>Sync emails</button>

//                 </div>

//               </div>

//               {gmailConnected && (

//                 <>

//                   <div className="feature-grid">

//                     <Stat title="Total emails" value={gmailStats?.total_emails ?? gmailEmails.length} />

//                     <Stat title="Interviews" value={gmailStats?.categories?.INTERVIEW ?? 0} />

//                     <Stat title="Assessments" value={gmailStats?.categories?.ASSESSMENT ?? 0} />

//                     <Stat title="Job offers" value={gmailStats?.categories?.JOB_OFFER ?? 0} />

//                   </div>

//                   <div className="panel result-panel">

//                     <h3>Saved HR emails</h3>

//                     {gmailEmails.length ? gmailEmails.map((email, index) => (

//                       <div className="indicator" key={email.id || email.message_id || index}>

//                         <BriefcaseBusiness size={16} />

//                         <span>{email.subject || email.snippet || 'Email without subject'}</span>

//                         <span className="panel-tag">{email.category || 'OTHER'}</span>

//                       </div>

//                     )) : <p>No saved emails yet. Click Sync emails to fetch messages.</p>}

//                   </div>

//                 </>

//               )}

//               <div className="three-tip-grid"><Tip icon={BriefcaseBusiness} title="Interview tracking" text="Identify interview invitations and recruiter communication." /><Tip icon={ClipboardCheck} title="Assessment tracking" text="Keep track of job assessments and related messages." /><Tip icon={CheckCircle2} title="Offer tracking" text="Organise job offers and recruitment updates." /></div>

//             </section>

//           )}



//           <footer className="page-footer"><span>© 2026 Jobify</span><span><ShieldCheck size={14} /> Built for safer job searching</span><span className="footer-demo">Connected to local backend</span></footer>

//         </div>

//       </main>

//     </div>

//   )

// }



// function ResumeMatchResult({ data, onGenerateRoadmap, onSkipRoadmap, busy }) {
//   const analysis = data?.skill_analysis || {}
//   const similarity = data?.text_similarity || {}
//   const matched = Array.isArray(analysis.matched_skills) ? analysis.matched_skills : []
//   const missing = Array.isArray(analysis.missing_skills) ? analysis.missing_skills : []
//   const required = Array.isArray(analysis.required_skills) ? analysis.required_skills : []
//   const applicant = Array.isArray(analysis.applicant_skills) ? analysis.applicant_skills : []

//   return (
//     <div className="panel result-panel" style={{ marginTop: 20 }}>
//       <span className="panel-tag">RESUME ANALYSIS</span>
//       <h3 style={{ marginTop: 10 }}>Your resume match results</h3>
//       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12, margin: '16px 0' }}>
//         <div style={{ background: '#f5f3ff', borderRadius: 12, padding: 16 }}>
//           <div style={{ fontSize: 12, color: '#6b7280' }}>Text similarity</div>
//           <strong style={{ display: 'block', fontSize: 28, color: '#6d28d9' }}>{similarity.match_score ?? '—'}{similarity.match_score != null ? '%' : ''}</strong>
//           <small style={{ color: '#6b7280' }}>Not hiring probability</small>
//         </div>
//         <div style={{ background: '#eff6ff', borderRadius: 12, padding: 16 }}>
//           <div style={{ fontSize: 12, color: '#6b7280' }}>Required skill coverage</div>
//           <strong style={{ display: 'block', fontSize: 28, color: '#1d4ed8' }}>{analysis.skill_match_score ?? '—'}{analysis.skill_match_score != null ? '%' : ''}</strong>
//           <small style={{ color: '#6b7280' }}>{matched.length} of {required.length} required skills matched</small>
//         </div>
//       </div>

//       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
//         <div>
//           <h4>Matched skills ({matched.length})</h4>
//           <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
//             {matched.length ? matched.map(skill => <span key={skill} style={{ background: '#dcfce7', color: '#166534', borderRadius: 20, padding: '6px 10px', fontSize: 13 }}>{skill}</span>) : <span style={{ color: '#6b7280' }}>No matched skills listed.</span>}
//           </div>
//         </div>
//         <div>
//           <h4>Missing skills ({missing.length})</h4>
//           <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
//             {missing.length ? missing.map(skill => <span key={skill} style={{ background: '#fef3c7', color: '#92400e', borderRadius: 20, padding: '6px 10px', fontSize: 13 }}>{skill}</span>) : <span style={{ color: '#6b7280' }}>No missing required skills identified.</span>}
//           </div>
//         </div>
//       </div>

//       {applicant.length > 0 && (
//         <div style={{ marginTop: 16 }}>
//           <h4>Skills found in your resume</h4>
//           <p style={{ color: '#64748b', lineHeight: 1.6 }}>{applicant.join(' · ')}</p>
//         </div>
//       )}

//       <div style={{ marginTop: 20, padding: 18, borderRadius: 14, background: '#f8f7ff', border: '1px solid #e5e1ff' }}>
//         <h3 style={{ margin: '0 0 6px' }}>Turn your skill gaps into a learning plan</h3>
//         <p style={{ margin: '0 0 14px', color: '#64748b', lineHeight: 1.6 }}>
//           Would you like Jobify's Career Coach to create a personalized roadmap using the missing skills from this resume analysis?
//         </p>
//         <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
//           <button className="primary-button" onClick={onGenerateRoadmap} disabled={busy || missing.length === 0}>
//             <Sparkles size={17} /> {busy ? 'Generating...' : 'Yes, create my roadmap'}
//           </button>
//           <button className="secondary-button" onClick={onSkipRoadmap} disabled={busy}>
//             Not now
//           </button>
//         </div>
//         {missing.length === 0 && <small style={{ display: 'block', marginTop: 10, color: '#64748b' }}>No missing skills were returned, so automatic roadmap generation is unavailable. You can still enter skills manually in Skill Coach.</small>}
//       </div>

//       <details style={{ marginTop: 16 }}>
//         <summary style={{ cursor: 'pointer', color: '#64748b' }}>View complete backend response</summary>
//         <pre className="json-result" style={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere', maxHeight: 320, overflow: 'auto' }}>{JSON.stringify(data, null, 2)}</pre>
//       </details>
//     </div>
//   )
// }

// function ScamExplainability({ data }) {
//   const ruleEvidence = Array.isArray(data?.rule_evidence) ? data.rule_evidence : []
//   const ml = data?.ml_explanation || {}
//   const fraudFeatures = Array.isArray(ml.fraud_contributors) ? ml.fraud_contributors : []
//   const legitimateFeatures = Array.isArray(ml.legitimate_contributors) ? ml.legitimate_contributors : []

//   const cardStyle = {
//     marginTop: 18,
//     padding: 20,
//     border: '1px solid var(--border, #e8e4f2)',
//     borderRadius: 14,
//     background: 'var(--surface, #fff)',
//     minWidth: 0
//   }
//   const evidenceStyle = {
//     marginTop: 8,
//     padding: '9px 12px',
//     borderRadius: 8,
//     background: '#fff1f1',
//     border: '1px solid #f3d5d5',
//     color: '#a83e49',
//     overflowWrap: 'anywhere',
//     fontSize: 13
//   }
//   const featureRow = (item, positive) => (
//     <div key={`${item.feature}-${item.contribution}`} style={{
//       display: 'flex',
//       justifyContent: 'space-between',
//       gap: 12,
//       padding: '9px 0',
//       borderBottom: '1px solid var(--border, #eee)',
//       fontSize: 13
//     }}>
//       <span style={{ overflowWrap: 'anywhere' }}>{item.feature}</span>
//       <b style={{ color: positive ? '#bd515b' : '#26845d', whiteSpace: 'nowrap' }}>
//         {Number(item.contribution).toFixed(4)}
//       </b>
//     </div>
//   )

//   return (
//     <div style={cardStyle}>
//       <div className="section-kicker">MODEL TRANSPARENCY</div>
//       <h3 style={{ margin: '5px 0 4px' }}>Why was this flagged?</h3>
//       <p style={{ color: 'var(--muted, #777)', fontSize: 13, marginTop: 0 }}>
//         Evidence from the rule engine and feature contributions from the trained ML model.
//       </p>

//       <div style={{ marginTop: 18 }}>
//         <h4>Rule-based evidence</h4>
//         {ruleEvidence.length ? ruleEvidence.map((item, index) => (
//           <div key={`${item.name}-${index}`} style={{
//             padding: 13,
//             marginTop: 10,
//             border: '1px solid var(--border, #e8e4f2)',
//             borderRadius: 10
//           }}>
//             <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
//               <b>{item.name}</b>
//               <span className="panel-tag">{item.severity || 'FLAGGED'} · Weight {item.weight ?? '—'}</span>
//             </div>
//             {item.explanation && <p style={{ fontSize: 13, margin: '8px 0' }}>{item.explanation}</p>}
//             {Array.isArray(item.evidence) && item.evidence.length > 0 && (
//               <>
//                 <small style={{ color: 'var(--muted, #777)' }}>Matched text</small>
//                 {item.evidence.map((phrase, phraseIndex) => (
//                   <div key={`${phrase}-${phraseIndex}`} style={evidenceStyle}>“{phrase}”</div>
//                 ))}
//               </>
//             )}
//           </div>
//         )) : <p>No rule evidence returned.</p>}
//       </div>

//       <div style={{ marginTop: 22 }}>
//         <h4>ML feature contributions</h4>
//         <p style={{ fontSize: 12, color: 'var(--muted, #777)' }}>
//           Positive values push the model toward fraud; negative values push it toward legitimate.
//           These are decision-score contributions, not probabilities or proof.
//         </p>
//         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 18 }}>
//           <div>
//             <b style={{ color: '#bd515b', fontSize: 13 }}>Fraud-driving features</b>
//             {fraudFeatures.length ? fraudFeatures.map(item => featureRow(item, true)) : <p>No positive feature contributions.</p>}
//           </div>
//           <div>
//             <b style={{ color: '#26845d', fontSize: 13 }}>Legitimate-driving features</b>
//             {legitimateFeatures.length ? legitimateFeatures.map(item => featureRow(item, false)) : <p>No negative feature contributions.</p>}
//           </div>
//         </div>
//       </div>
//       <div className="demo-disclaimer" style={{ marginTop: 16 }}>
//         Feature contributions describe this model's learned associations. They do not establish that a phrase or job posting is fraudulent.
//       </div>
//     </div>
//   )
// }

// function DocumentResult({ data }) {

//   const analysis = data?.analysis || {}

//   const extraction = data?.extraction || {}

//   const riskLevel = String(analysis.risk_level || 'UNKNOWN').toUpperCase()

//   const riskClass = riskLevel === 'LOW' ? 'risk-low' : riskLevel === 'MEDIUM' ? 'risk-medium' : 'risk-high'

//   const indicators = Array.isArray(analysis.indicators) ? analysis.indicators : []

//   const explanation = analysis.gemini_analysis?.explanation



//   return (

//     <div className="panel result-panel document-result" style={{ minWidth: 0, maxWidth: '100%', overflow: 'hidden' }}>

//       <div className="result-header">

//         <div>

//           <span className="section-kicker">DOCUMENT SCAN COMPLETE</span>

//           <h3 style={{ overflowWrap: 'anywhere' }}>{data.filename || 'Uploaded document'}</h3>

//           <p style={{ marginTop: 6, color: 'var(--muted, #777)' }}>

//             {extraction.method || 'Document parser'} · {extraction.character_count ?? 0} characters extracted

//           </p>

//         </div>

//         <span className={riskClass}>{riskLevel} RISK</span>

//       </div>



//       {analysis.risk_score !== undefined && (

//         <div className="result-grid" style={{ minWidth: 0 }}>

//           <div className="score-card">

//             <div className="score-ring">

//               <strong>{Number(analysis.risk_score).toFixed(2)}</strong>

//               <small>/100</small>

//             </div>

//             <span className={riskClass}>{riskLevel} RISK</span>

//             <p>{analysis.category || 'Unclassified'}</p>

//           </div>

//           <div className="result-details" style={{ minWidth: 0, overflowWrap: 'anywhere' }}>

//             <h4>Potential warning signs</h4>

//             {indicators.length > 0 ? indicators.map((item, index) => (

//               <div className="indicator" key={`${item.name || 'indicator'}-${index}`}>

//                 <AlertTriangle size={16} />

//                 <span style={{ overflowWrap: 'anywhere' }}>{item.name || 'Warning indicator'}</span>

//                 {item.weight !== undefined && <span className="indicator-weight">{item.weight}</span>}

//               </div>

//             )) : <p>No obvious rule-based warning indicators were detected.</p>}

//             {analysis.recommendation && (

//               <div className="recommendation">

//                 <b>Recommended next step</b>

//                 <p>{analysis.recommendation}</p>

//               </div>

//             )}

//           </div>

//         </div>

//       )}



//       {explanation && (

//         <div className="recommendation ai-explanation" style={{ minWidth: 0, overflowWrap: 'anywhere' }}>

//           <b>AI explanation</b>

//           <p style={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere', wordBreak: 'break-word', fontSize: 15, lineHeight: 1.85, color: '#514968' }}>{explanation}</p>

//           {analysis.gemini_analysis?.provider && <small>AI provider: {analysis.gemini_analysis.provider}</small>}

//         </div>

//       )}



//       {extraction.extracted_text && (

//         <details style={{ marginTop: 20, minWidth: 0 }}>

//           <summary style={{ cursor: 'pointer', fontWeight: 600, padding: '12px 0' }}>

//             View extracted document text

//           </summary>

//           <div

//             style={{

//               boxSizing: 'border-box',

//               width: '100%',

//               maxWidth: '100%',

//               maxHeight: 260,

//               overflowY: 'auto',

//               overflowX: 'hidden',

//               whiteSpace: 'pre-wrap',

//               overflowWrap: 'anywhere',

//               wordBreak: 'break-word',

//               background: 'var(--surface-soft, #f7f6fb)',

//               border: '1px solid var(--border, #e8e4f2)',

//               borderRadius: 12,

//               padding: 16,

//               fontSize: 13,

//               lineHeight: 1.65

//             }}

//           >

//             {extraction.extracted_text}

//           </div>

//         </details>

//       )}



//       <div className="demo-disclaimer" style={{ overflowWrap: 'anywhere' }}>

//         Automated screening is a decision-support aid, not proof that a document or employer is fraudulent or legitimate.

//       </div>

//     </div>

//   )

// }



// function ResultObject({ title, data }) {

//   return (

//     <div className="panel result-panel">

//       <span className="section-kicker">BACKEND RESPONSE</span>

//       <h3>{title}</h3>

//       <pre className="json-result" style={{ maxWidth: "100%", overflowX: "auto", whiteSpace: "pre-wrap", overflowWrap: "anywhere", wordBreak: "break-word" }}>{JSON.stringify(data, null, 2)}</pre>

//     </div>

//   )

// }



// function Stat({ title, value }) {

//   return <div className="panel"><h3>{title}</h3><h2>{value}</h2></div>

// }



// function PageHeading({ eyebrow, title, description }) {

//   return <div className="page-heading"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{description}</p></div><div className="heading-badge"><ShieldCheck size={17} /> Safety-first tools</div></div>

// }



// function Tip({ icon: Icon, title, text }) {

//   return <div className="tip-card"><div className="tip-icon"><Icon size={18} /></div><b>{title}</b><p>{text}</p></div>

// }



// function Overview({ setPage }) {

//   return (

//     <section>

//       <div className="hero-panel">

//         <div className="hero-copy">

//           <div className="eyebrow"><span className="eyebrow-dot" /> YOUR CAREER, WITH MORE CONFIDENCE</div>

//           <h1>Make your next career move<br /><span className="gradient-text">a safer one.</span></h1>

//           <p className="hero-description">Spot suspicious job offers, review documents, and find your next skill to build — all in one workspace.</p>

//           <div className="hero-actions"><button className="primary-button" onClick={() => setPage('scan')}><ScanSearch size={17} /> Check a job message <ArrowRight size={17} /></button><button className="secondary-button" onClick={() => setPage('resume')}>Match my resume <ArrowUpRight size={16} /></button></div>

//           <div className="hero-proof"><span><CheckCircle2 size={15} /> Explainable checks</span><span><CheckCircle2 size={15} /> Career-focused tools</span></div>

//         </div>

//         <div className="hero-visual" aria-hidden="true"><div className="visual-ring ring-one" /><div className="visual-ring ring-two" /><div className="visual-ring ring-three" /><div className="visual-orbit orbit-one"><span className="orbit-ball ball-one" /><span className="orbit-ball ball-two" /></div><div className="visual-orbit orbit-two"><span className="orbit-ball ball-three" /><span className="orbit-ball ball-four" /></div><div className="visual-core"><ShieldCheck size={56} strokeWidth={1.6} /></div><div className="float-chip chip-top"><span className="chip-dot green" /> Safety check <b>Ready</b></div><div className="float-chip chip-bottom"><Sparkles size={14} /> Explainable AI</div></div>

//       </div>

//       <div className="section-title-row"><div><div className="eyebrow">YOUR WORKSPACE</div><h2>Tools for every step</h2><p>Practical checks to help you make informed career decisions.</p></div><span className="section-count">06 TOOLS</span></div>

//       <div className="feature-grid">

//         <Feature icon={ScanSearch} color="purple" tag="CORE TOOL" title="Scam detector" text="Check a suspicious message for warning signs and a risk explanation." action="Check a message" onClick={() => setPage('scan')} />

//         <Feature icon={FileSearch} color="blue" title="Document scan" text="Upload a job offer document for text extraction and review." action="Scan a document" onClick={() => setPage('document')} />

//         <Feature icon={FileText} color="pink" title="Resume matcher" text="Compare your resume against a target job description." action="Match resume" onClick={() => setPage('resume')} />

//         <Feature icon={GraduationCap} color="peach" title="Skill coach" text="Turn missing skills into a structured learning roadmap." action="Plan learning" onClick={() => setPage('coach')} />

//         <Feature icon={ClipboardCheck} color="blue" title="AI mock interview" text="Practise role-specific HR and technical interview questions." action="Start practising" onClick={() => setPage('interview')} />

//         <Feature icon={BriefcaseBusiness} color="purple" title="HR email intelligence" text="Organise interviews, assessments and offers from Gmail." action="Connect Gmail" onClick={() => setPage('email')} />

//       </div>

//       <div className="bottom-grid">

//         <div className="panel trust-panel"><div className="trust-icon"><ShieldCheck size={20} /></div><div><h3>Stay in control of your career</h3><p>Use these tools as a second opinion. Verify employers through independent, trusted sources before sharing money or personal information.</p></div><button className="text-button" onClick={() => setPage('scan')}>Start a check <ArrowRight size={15} /></button></div>

//         <div className="panel quick-panel"><div className="quick-heading"><div><h3>Before you apply</h3><p>A quick safety checklist</p></div><ClipboardCheck size={19} /></div><div className="quick-item"><CircleCheck size={16} /> Verify the company's official website</div><div className="quick-item"><CircleCheck size={16} /> Never pay to secure a job</div><div className="quick-item"><CircleCheck size={16} /> Be cautious with urgent requests</div></div>

//       </div>

//     </section>

//   )

// }



// function Feature({ icon: Icon, color, tag, title, text, action, onClick }) {

//   return <button className="feature-card" onClick={onClick}><div className={`feature-icon ${color}`}><Icon size={20} /></div><div className="feature-meta">{tag || 'CAREER TOOL'}</div><h3>{title}</h3><p>{text}</p><span className="feature-action">{action}<ArrowRight size={15} /></span></button>

// }



// createRoot(document.getElementById('root')).render(<App />)
import React, { useMemo, useState } from 'react'

import { createRoot } from 'react-dom/client'

import {

  ShieldCheck, LayoutDashboard, ScanSearch, FileSearch, FileText, GraduationCap,

  Settings, Bell, ChevronDown, ArrowUpRight, ArrowRight, UploadCloud, Link2,

  CheckCircle2, AlertTriangle, CircleHelp, Sparkles, Menu, X, LockKeyhole,

  ShieldAlert, ClipboardCheck, BriefcaseBusiness, Clock3, FileCheck2, Target,

  Lightbulb, CircleCheck, RotateCcw, BrainCircuit, MessageSquareText

} from 'lucide-react'

import './styles.css'

import './jobify-accessibility.css'



const API = 'http://127.0.0.1:8000'



const navItems = [

  { id: 'overview', label: 'Overview', icon: LayoutDashboard, group: 'WORKSPACE' },

  { id: 'scan', label: 'Scam detector', icon: ScanSearch, group: 'WORKSPACE' },

  { id: 'document', label: 'Document scan', icon: FileSearch, group: 'WORKSPACE' },

  { id: 'resume', label: 'Resume matcher', icon: FileText, group: 'CAREER TOOLS' },

  { id: 'coach', label: 'Skill coach', icon: GraduationCap, group: 'CAREER TOOLS' },

  { id: 'interview', label: 'AI mock interview', icon: ClipboardCheck, group: 'CAREER TOOLS' },

  { id: 'email', label: 'HR email intelligence', icon: BriefcaseBusiness, group: 'CAREER TOOLS' },

]



async function readResponse(response) {

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {

    const detail = data.detail

    throw new Error(typeof detail === 'string' ? detail : `Request failed (${response.status})`)

  }

  return data

}



function App() {

  const [page, setPage] = useState('overview')

  const [mobileNav, setMobileNav] = useState(false)

  const [message, setMessage] = useState('')

  const [documentFile, setDocumentFile] = useState(null)

  const [resume, setResume] = useState(null)

  const [jobDescription, setJobDescription] = useState('')

  const [targetJob, setTargetJob] = useState('Frontend Developer')

  const [skills, setSkills] = useState('React, TypeScript, Testing')

  const [result, setResult] = useState(null)

  const [documentResult, setDocumentResult] = useState(null)

  const [resumeResult, setResumeResult] = useState(null)

  const [roadmapResult, setRoadmapResult] = useState(null)

  const [notice, setNotice] = useState('')

  const [showProfile, setShowProfile] = useState(false)

  const [busy, setBusy] = useState(false)

  const [gmailConnected, setGmailConnected] = useState(false)

  const [gmailStats, setGmailStats] = useState(null)

  const [gmailEmails, setGmailEmails] = useState([])

  const [gmailLoading, setGmailLoading] = useState(false)

  const [interviewType, setInterviewType] = useState('both')

  const [interviewDifficulty, setInterviewDifficulty] = useState('adaptive')

  const [interviewSession, setInterviewSession] = useState(null)

  const [interviewQuestion, setInterviewQuestion] = useState(null)

  const [interviewAnswer, setInterviewAnswer] = useState('')

  const [interviewFeedback, setInterviewFeedback] = useState(null)

  const [interviewHistory, setInterviewHistory] = useState([])

  const [interviewFinished, setInterviewFinished] = useState(false)



  const title = navItems.find(item => item.id === page)?.label || 'Overview'

  const wordCount = useMemo(

    () => message.trim() ? message.trim().split(/\s+/).length : 0,

    [message]

  )



  function changePage(id) {

    setPage(id)

    setMobileNav(false)

    setNotice('')

  }



  async function demoScan() {

    if (message.trim().length < 10) {

      setNotice('Enter at least 10 characters to analyze.')

      return

    }

    setBusy(true)

    setNotice('Analyzing message with Jobify AI...')

    setResult(null)

    try {

      const response = await fetch(`${API}/api/analyze`, {

        method: 'POST',

        headers: { 'Content-Type': 'application/json' },

        body: JSON.stringify({ text: message })

      })

      const data = await readResponse(response)

      setResult({

        score: data.risk_score,

        level: data.risk_level || data.risk || 'UNKNOWN',

        category: data.category || 'UNCLASSIFIED',

        ruleScore: data.rule_score,

        mlScore: data.ml_score,

        indicators: Array.isArray(data.indicators) ? data.indicators : [],

        recommendation: data.recommendation || 'Verify the employer independently.',

        gemini_analysis: data.gemini_analysis,
        explainability: data.explainability || null

      })

      setNotice('Analysis completed successfully.')

    } catch (error) {

      console.error('Jobify analysis error:', error)

      setNotice(error.message || 'Could not connect to the backend.')

    } finally {

      setBusy(false)

    }

  }



  async function analyzeDocument() {

    if (!documentFile) {

      setNotice('Choose a document first.')

      return

    }

    setBusy(true)

    setDocumentResult(null)

    setNotice('Analyzing document...')

    try {

      const formData = new FormData()

      formData.append('file', documentFile)

      const response = await fetch(`${API}/api/document/analyze`, {

        method: 'POST',

        body: formData

      })

      const data = await readResponse(response)

      setDocumentResult(data)

      setNotice('Document analysis completed.')

    } catch (error) {

      console.error('Document analysis error:', error)

      setNotice(error.message || 'Document analysis failed.')

    } finally {

      setBusy(false)

    }

  }



  async function matchResume() {

    if (!resume) {

      setNotice('Upload your resume first.')

      return

    }

    if (!jobDescription.trim()) {

      setNotice('Enter a job description first.')

      return

    }

    setBusy(true)

    setResumeResult(null)

    setNotice('Matching your resume...')

    try {

      const formData = new FormData()

      formData.append('file', resume)

      formData.append('job_description', jobDescription)

      const response = await fetch(`${API}/api/resume/match`, {

        method: 'POST',

        body: formData

      })

      const data = await readResponse(response)

      setResumeResult(data)

      setNotice('Resume matching completed.')

    } catch (error) {

      console.error('Resume matching error:', error)

      setNotice(error.message || 'Resume matching failed.')

    } finally {

      setBusy(false)

    }

  }



  async function generateRoadmap() {

    const missingSkills = skills.split(',').map(skill => skill.trim()).filter(Boolean)

    if (!targetJob.trim()) {

      setNotice('Enter your target job role.')

      return

    }

    if (!missingSkills.length) {

      setNotice('Enter at least one skill.')

      return

    }

    setBusy(true)

    setRoadmapResult(null)

    setNotice('Generating your learning roadmap...')

    try {

      const response = await fetch(`${API}/api/skill-coach/roadmap`, {

        method: 'POST',

        headers: { 'Content-Type': 'application/json' },

        body: JSON.stringify({ target_job: targetJob, missing_skills: missingSkills })

      })

      const data = await readResponse(response)

      setRoadmapResult(data)

      setNotice('Your learning roadmap is ready.')

    } catch (error) {

      console.error('Roadmap error:', error)

      setNotice(error.message || 'Roadmap generation failed.')

    } finally {

      setBusy(false)

    }

  }



  async function startInterview() {

    if (!targetJob.trim()) {

      setNotice('Enter the role you want to practise for.')

      return

    }

    setBusy(true)

    setInterviewSession(null)

    setInterviewQuestion(null)

    setInterviewAnswer('')

    setInterviewFeedback(null)

    setInterviewHistory([])

    setInterviewFinished(false)

    setNotice('Preparing your AI mock interview...')

    try {

      const data = await readResponse(await fetch(`${API}/api/interview/start`, {

        method: 'POST',

        headers: { 'Content-Type': 'application/json' },

        body: JSON.stringify({

          target_job: targetJob,

          interview_type: interviewType,

          difficulty: {
  easy: 'beginner',
  medium: 'intermediate',
  hard: 'advanced',
  adaptive: 'adaptive'
}[interviewDifficulty] || 'intermediate'

        })

      }))

      const question = data.current_question || data.question || data.first_question

      setInterviewSession(data.session_id || data.id || null)

      setInterviewQuestion(question)

      setNotice(question ? 'Your mock interview is ready. Answer the first question.' : 'Interview started, but the backend did not return a question.')

    } catch (error) {

      console.error('Interview start error:', error)

      setNotice(error.message || 'Could not start the mock interview. The interview backend may not be connected yet.')

    } finally {

      setBusy(false)

    }

  }



  async function submitInterviewAnswer() {

    if (!interviewSession || !interviewQuestion) {

      setNotice('Start a mock interview first.')

      return

    }

    if (!interviewAnswer.trim()) {

      setNotice('Write your answer before submitting.')

      return

    }

    setBusy(true)

    setNotice('Evaluating your answer...')

    try {

      const data = await readResponse(await fetch(`${API}/api/interview/answer`, {

        method: 'POST',

        headers: { 'Content-Type': 'application/json' },

        body: JSON.stringify({

          session_id: interviewSession,

          question_id: interviewQuestion.id || interviewQuestion.question_id || null,

          question: interviewQuestion.question || interviewQuestion.text || interviewQuestion.prompt || '',

          answer: interviewAnswer

        })

      }))

      const feedback = data.feedback || data.evaluation || data.result || data

      setInterviewHistory(previous => [...previous, {

        question: interviewQuestion.question || interviewQuestion.text || interviewQuestion.prompt || '',

        answer: interviewAnswer,

        feedback

      }])

      setInterviewFeedback(feedback)

      const nextQuestion = data.next_question || data.current_question

      setInterviewAnswer('')

      if (nextQuestion) {

        setInterviewQuestion(nextQuestion)

        setNotice('Answer evaluated. Your next question is ready.')

      } else if (data.completed || data.finished || data.is_complete) {

        setInterviewQuestion(null)

        setInterviewFinished(true)

        setNotice('Mock interview completed. Review your feedback below.')

      } else {

        setInterviewQuestion(null)

        setInterviewFinished(true)

        setNotice('No further question was returned. Review your feedback below.')

      }

    } catch (error) {

      console.error('Interview answer error:', error)

      setNotice(error.message || 'Could not evaluate your answer.')

    } finally {

      setBusy(false)

    }

  }



  function resetInterview() {

    setInterviewSession(null)

    setInterviewQuestion(null)

    setInterviewAnswer('')

    setInterviewFeedback(null)

    setInterviewHistory([])

    setInterviewFinished(false)

    setNotice('')

  }



  async function loadGmail() {

    setGmailLoading(true)

    setNotice('Checking Gmail connection...')

    try {

      const status = await readResponse(await fetch(`${API}/api/email/status`))

      const connected = Boolean(status.connected)

      setGmailConnected(connected)

      if (!connected) {

        setGmailStats(null)

        setGmailEmails([])

        setNotice('Gmail is not connected yet. Connect your account to continue.')

        return

      }

      const [dashboard, saved] = await Promise.all([

        fetch(`${API}/api/email/dashboard`).then(readResponse),

        fetch(`${API}/api/email/saved`).then(readResponse)

      ])

      setGmailStats(dashboard.dashboard || dashboard)

      setGmailEmails(Array.isArray(saved.emails) ? saved.emails : [])

      setNotice('Gmail connected. Your saved messages are loaded.')

    } catch (error) {

      console.error('Gmail loading error:', error)

      setNotice(error.message || 'Could not load Gmail data.')

    } finally {

      setGmailLoading(false)

    }

  }



  async function syncGmail() {

    setGmailLoading(true)

    setNotice('Syncing Gmail messages...')

    try {

      await readResponse(await fetch(`${API}/api/email/sync`, { method: 'POST' }))

      await loadGmail()

      setNotice('Gmail sync completed.')

    } catch (error) {

      setNotice(error.message || 'Gmail sync failed.')

    } finally {

      setGmailLoading(false)

    }

  }



  function resetResult() {

    setResult(null)

    setNotice('')

  }



  return (

    <div className="app-shell">

      <aside className={`sidebar ${mobileNav ? 'sidebar-open' : ''}`}>

        <div className="brand-row">

          <div className="brand-mark"><ShieldCheck size={23} strokeWidth={2.2} /></div>

          <div className="brand-name">Jobify<span>.</span><small>CAREER SAFETY</small></div>

          <button className="icon-button mobile-close" onClick={() => setMobileNav(false)} aria-label="Close menu"><X size={19} /></button>

        </div>

        <div className="workspace-pill"><span className="workspace-dot" /> Personal workspace <ChevronDown size={14} /></div>

        {['WORKSPACE', 'CAREER TOOLS'].map(group => (

          <div className="nav-group" key={group}>

            <div className="nav-label">{group}</div>

            {navItems.filter(item => item.group === group).map(item => {

              const Icon = item.icon

              return (

                <button key={item.id} className={`nav-item ${page === item.id ? 'active' : ''}`} onClick={() => changePage(item.id)}>

                  <Icon size={18} /><span>{item.label}</span>{item.id === 'scan' && <span className="nav-new">AI</span>}

                </button>

              )

            })}

          </div>

        ))}

        <div className="sidebar-bottom">

          <div className="security-mini">

            <div className="security-mini-icon"><LockKeyhole size={17} /></div>

            <div><b>Your safety comes first</b><span>Review every opportunity carefully.</span></div>

          </div>

          <button className="nav-item settings-item" onClick={() => setNotice('Settings will be available in a future version.')}><Settings size={18} /><span>Settings</span></button>

          <div className="sidebar-user">

            <div className="avatar">JD</div><div className="user-meta"><b>Job Seeker</b><span>Free workspace</span></div>

            <button className="icon-button" aria-label="Profile menu" onClick={() => setShowProfile(!showProfile)}><ChevronDown size={16} /></button>

            {showProfile && <div className="profile-popover">Demo profile<br /><small>No account connected</small></div>}

          </div>

        </div>

      </aside>



      {mobileNav && <button className="scrim" onClick={() => setMobileNav(false)} aria-label="Close navigation" />}

      <main className="main-area">

        <header className="topbar">

          <div className="topbar-left">

            <button className="icon-button mobile-menu" onClick={() => setMobileNav(true)} aria-label="Open menu"><Menu size={20} /></button>

            <div className="breadcrumbs">Workspace <span>/</span> <b>{title}</b></div>

          </div>

          <div className="topbar-actions">

            <div className="demo-badge"><span /> Backend connected locally</div>

            <button className="icon-button notification" aria-label="Notifications" onClick={() => setNotice('You are all caught up.')}><Bell size={18} /><i /></button>

            <div className="top-avatar">JD</div>

          </div>

        </header>



        <div className="page-content">

          {notice && <div className="notice global-notice"><CircleHelp size={16} />{notice}</div>}



          {page === 'overview' && <Overview setPage={changePage} />}



          {page === 'scan' && (

            <section>

              <PageHeading eyebrow="AI SECURITY TOOL" title="Check a job message" description="Review suspicious job offers, recruiter messages, or job descriptions before you respond." />

              <div className="tool-layout">

                <div className="panel scan-panel">

                  <div className="panel-heading">

                    <div className="heading-icon purple"><ScanSearch size={19} /></div>

                    <div><h3>Message analysis</h3><p>Paste the text you want to check.</p></div>

                    <span className="panel-tag">Up to 5,000 characters</span>

                  </div>

                  <label className="field-label" htmlFor="message">Message or job offer</label>

                  <textarea id="message" className="text-area" maxLength={5000} value={message} onChange={event => { setMessage(event.target.value); setNotice('') }} placeholder="Paste the recruiter message, job offer, or suspicious text here…" />

                  <div className="input-foot"><span>Do not include passwords or private account details.</span><span>{message.length}/5,000 · {wordCount} words</span></div>

                  <div className="sample-row">

                    <span>Try an example:</span>

                    <button className="sample-chip" onClick={() => setMessage('Congratulations! You have been selected for a remote job. Pay a refundable registration fee today to secure your position.')}>Urgent payment request</button>

                    <button className="sample-chip" onClick={() => setMessage('We would like to schedule an interview for the software developer position. Please review the job description and reply with your available times.')}>Interview invitation</button>

                  </div>

                  <button className="primary-button full-button" onClick={demoScan} disabled={busy}><Sparkles size={17} /> {busy ? 'Analyzing...' : 'Analyze with Jobify AI'} <ArrowRight size={17} /></button>

                  <div className="privacy-note"><LockKeyhole size={15} /> Message text is sent to your local Jobify backend for analysis.</div>

                </div>

                <div className="panel side-info-panel">

                  <div className="info-illustration"><div className="illustration-orbit orbit-a" /><div className="illustration-orbit orbit-b" /><div className="illustration-core"><ShieldCheck size={42} /></div><span className="spark spark-a" /><span className="spark spark-b" /></div>

                  <h3>Look beyond the wording</h3>

                  <p>Scam messages can look professional. Check payment requests, recruiter identity, and links before sharing information.</p>

                  <div className="check-list"><div><CheckCircle2 size={17} /> Unexpected fees or deposits</div><div><CheckCircle2 size={17} /> Pressure to act immediately</div><div><CheckCircle2 size={17} /> Unverified company details</div></div>

                  <div className="info-footer"><ShieldAlert size={17} /><span>Even a low-risk result cannot guarantee that a job is legitimate.</span></div>

                </div>

              </div>



              {result && (

                <div className="panel result-panel">

                  <div className="result-header">

                    <div><span className="section-kicker">LIVE AI ANALYSIS</span><h3>Job risk assessment</h3></div>

                    <button className="text-button" onClick={resetResult}><RotateCcw size={15} /> Clear result</button>

                  </div>

                  <div className="result-grid">

                    <div className="score-card">

                      <div className="score-ring"><strong>{Number(result.score ?? 0).toFixed(2)}</strong><small>/100</small></div>

                      <span className={result.level === 'LOW' ? 'risk-low' : result.level === 'MEDIUM' ? 'risk-medium' : 'risk-high'}>{result.level} RISK</span>

                      <p>{result.category}</p>

                      <small>Rule score: {result.ruleScore ?? '—'} · ML score: {result.mlScore ?? '—'}</small>

                    </div>

                    <div className="result-details">

                      <h4>Potential warning signs</h4>

                      {result.indicators.length ? result.indicators.map((item, index) => (

                        <div className="indicator" key={`${item.name}-${index}`}><AlertTriangle size={16} /><span>{item.name}</span><span className="indicator-weight">{item.weight}</span></div>

                      )) : <p>No rule-based warning indicators were returned. Still verify the employer independently.</p>}

                      <div className="recommendation"><b>Recommended next step</b><p>{result.recommendation}</p></div>

                    </div>

                  </div>

                  {result.explainability && (
                      <ScamExplainability data={result.explainability} />
                    )}
                    {result.gemini_analysis?.enabled && (

                    <div className="recommendation ai-explanation">

                      <b>AI investigation and safety advice</b>

                      <p style={{ whiteSpace: 'pre-wrap', lineHeight: 1.7 }}>{result.gemini_analysis.explanation}</p>

                      <small>AI provider: {result.gemini_analysis.provider}</small>

                    </div>

                  )}

                  <div className="demo-disclaimer">Generated by Jobify's machine-learning and AI services. This is a screening aid, not proof of fraud or legitimacy.</div>

                </div>

              )}

            </section>

          )}



          {page === 'document' && (

            <section>

              <PageHeading eyebrow="DOCUMENT CHECK" title="Scan a job document" description="Upload a PDF, DOCX, or supported image of a job offer for text extraction and scam analysis." />

              <div className="panel document-panel">

                <div className="panel-heading"><div className="heading-icon purple"><FileSearch size={19} /></div><div><h3>Upload a document</h3><p>Supported formats depend on the backend document parser.</p></div></div>

                <label className={`drop-zone ${documentFile ? 'has-file' : ''}`}>

                  <input type="file" accept=".pdf,.docx,.png,.jpg,.jpeg" onChange={event => { setDocumentFile(event.target.files?.[0] || null); setDocumentResult(null); setNotice('') }} />

                  <div className="upload-icon"><UploadCloud size={26} /></div>

                  <b>{documentFile ? documentFile.name : 'Choose a file or drag it here'}</b>

                  <span>{documentFile ? `${(documentFile.size / 1024 / 1024).toFixed(2)} MB · selected` : 'PDF, DOCX, PNG, JPG or JPEG'}</span>

                  <span className="browse-button">{documentFile ? 'Choose another file' : 'Browse files'}</span>

                </label>

                <button className="primary-button" onClick={analyzeDocument} disabled={busy}><FileSearch size={17} /> {busy ? 'Analyzing...' : 'Analyze document'}</button>

                <div className="privacy-note"><LockKeyhole size={15} /> The selected file is uploaded to your local backend for processing.</div>

              </div>

              {documentResult && <DocumentResult data={documentResult} />}

              <div className="three-tip-grid"><Tip icon={FileCheck2} title="Readable text" text="Use a clear document with selectable text when possible." /><Tip icon={ShieldCheck} title="Verify the source" text="Check the sender and employer independently." /><Tip icon={Clock3} title="Review carefully" text="Do not rush into paying fees or sharing documents." /></div>

            </section>

          )}



          {page === 'resume' && (

            <section>

              <PageHeading eyebrow="CAREER MATCHING" title="Match your resume to a role" description="Compare a resume with a job description to review text similarity and skill coverage." />

              <div className="panel resume-panel">

                <div className="panel-heading"><div className="heading-icon purple"><FileText size={19} /></div><div><h3>Resume and job details</h3><p>Upload a resume and paste the role description.</p></div><span className="panel-tag">Maximum file size: 5 MB</span></div>

                <label className="field-label">Resume file</label>

                <label className={`resume-drop ${resume ? 'has-file' : ''}`}>

                  <input type="file" accept=".pdf,.docx" onChange={event => { setResume(event.target.files?.[0] || null); setResumeResult(null); setNotice('') }} />

                  <div className="upload-icon small"><UploadCloud size={22} /></div>

                  <div><b>{resume ? resume.name : 'Upload your resume'}</b><span>{resume ? `${(resume.size / 1024 / 1024).toFixed(2)} MB selected` : 'PDF or DOCX'}</span></div>

                  <span className="browse-button">{resume ? 'Change' : 'Browse'}</span>

                </label>

                <label className="field-label" htmlFor="job-desc">Job description</label>

                <textarea id="job-desc" className="text-area job-textarea" maxLength={10000} value={jobDescription} onChange={event => setJobDescription(event.target.value)} placeholder="Paste the target job description, required skills, and responsibilities…" />

                <div className="input-foot"><span>Include required skills for a useful comparison.</span><span>{jobDescription.length}/10,000</span></div>

                <button className="primary-button" onClick={matchResume} disabled={busy}><Target size={17} /> {busy ? 'Matching...' : 'Match resume'}</button>

                <div className="privacy-note"><LockKeyhole size={15} /> Your resume and job description are uploaded to your local backend.</div>

              </div>

              {resumeResult && <ResultObject title="Resume match result" data={resumeResult} />}

              <div className="three-tip-grid"><Tip icon={Target} title="Text similarity" text="Estimate how closely resume content aligns with the role." /><Tip icon={CheckCircle2} title="Matched skills" text="Identify skills mentioned in both documents." /><Tip icon={Lightbulb} title="Skill gaps" text="Use missing skills to plan your next learning steps." /></div>

            </section>

          )}



          {page === 'coach' && (

            <section>

              <PageHeading eyebrow="PERSONALISED LEARNING" title="Build a skill roadmap" description="Enter a target role and skills you want to improve to generate a learning roadmap." />

              <div className="coach-layout">

                <div className="panel coach-panel">

                  <div className="panel-heading"><div className="heading-icon purple"><GraduationCap size={19} /></div><div><h3>Your learning goal</h3><p>Use the role and skill gaps from your resume review.</p></div></div>

                  <label className="field-label" htmlFor="target-job">Target job role</label>

                  <input id="target-job" className="text-input" maxLength={150} value={targetJob} onChange={event => setTargetJob(event.target.value)} placeholder="e.g. Frontend Developer" />

                  <label className="field-label" htmlFor="missing-skills">Skills to improve</label>

                  <textarea id="missing-skills" className="text-area skills-textarea" value={skills} onChange={event => setSkills(event.target.value)} placeholder="Enter missing skills separated by commas…" />

                  <div className="input-foot"><span>Enter skills separated by commas.</span><span>{skills.split(',').map(skill => skill.trim()).filter(Boolean).length} skills</span></div>

                  <button className="primary-button" onClick={generateRoadmap} disabled={busy}><Sparkles size={17} /> {busy ? 'Generating...' : 'Generate learning roadmap'}</button>

                </div>

                <div className="panel roadmap-preview">

                  <div className="roadmap-top"><div className="heading-icon peach"><Lightbulb size={20} /></div><span className="panel-tag">LEARNING PLAN</span></div>

                  <h3>A clear path to your next role</h3>

                  {roadmapResult ? <RoadmapResult data={roadmapResult} /> : <p>Your personalised roadmap will appear here after generation.</p>}

                </div>

              </div>

            </section>

          )}



          {page === 'interview' && (

            <section>

              <PageHeading

                eyebrow="AI INTERVIEW ARENA"

                title="Practise before the real interview"

                description="Take an adaptive mock interview, answer one question at a time, and receive feedback on your responses."

              />

              {!interviewSession && (

                <div className="panel resume-panel">

                  <div className="panel-heading">

                    <div className="heading-icon purple"><ClipboardCheck size={19} /></div>

                    <div><h3>Set up your mock interview</h3><p>Choose the role and interview format you want to practise.</p></div>

                    <span className="panel-tag">AI PRACTICE</span>

                  </div>

                  <label className="field-label" htmlFor="interview-role">Target job role</label>

                  <input id="interview-role" className="text-input" maxLength={150} value={targetJob} onChange={event => setTargetJob(event.target.value)} placeholder="e.g. Python Developer" />

                  <label className="field-label">Interview type</label>

                  <div className="sample-row">

                    <button className={`sample-chip ${interviewType === 'technical' ? 'selected' : ''}`} onClick={() => setInterviewType('technical')}>Technical</button>

                    <button className={`sample-chip ${interviewType === 'hr' ? 'selected' : ''}`} onClick={() => setInterviewType('hr')}>HR / Behavioural</button>

                    <button className={`sample-chip ${interviewType === 'both' ? 'selected' : ''}`} onClick={() => setInterviewType('both')}>Both</button>

                  </div>

                  <label className="field-label">Difficulty</label>

                  <div className="sample-row">

                    <button className={`sample-chip ${interviewDifficulty === 'easy' ? 'selected' : ''}`} onClick={() => setInterviewDifficulty('easy')}>Beginner</button>

                    <button className={`sample-chip ${interviewDifficulty === 'medium' ? 'selected' : ''}`} onClick={() => setInterviewDifficulty('medium')}>Intermediate</button>

                    <button className={`sample-chip ${interviewDifficulty === 'hard' ? 'selected' : ''}`} onClick={() => setInterviewDifficulty('hard')}>Advanced</button>

                    <button className={`sample-chip ${interviewDifficulty === 'adaptive' ? 'selected' : ''}`} onClick={() => setInterviewDifficulty('adaptive')}>Adaptive</button>

                  </div>

                  <button className="primary-button" onClick={startInterview} disabled={busy}>

                    <Sparkles size={17} /> {busy ? 'Preparing...' : 'Start AI mock interview'} <ArrowRight size={17} />

                  </button>

                  <div className="privacy-note"><LockKeyhole size={15} /> Your answers are sent to the Jobify backend for evaluation.</div>

                </div>

              )}



              {interviewSession && (

                <div className="panel result-panel">

                  <div className="result-header">

                    <div><span className="section-kicker">LIVE MOCK INTERVIEW</span><h3>{targetJob}</h3></div>

                    <button className="text-button" onClick={resetInterview}><RotateCcw size={15} /> End / restart</button>

                  </div>

                  {interviewQuestion && (

                    <div className="coach-panel">

                      <span className="panel-tag">QUESTION {interviewHistory.length + 1}</span>

                      <h3 style={{ marginTop: 12 }}>{interviewQuestion.question || interviewQuestion.text || interviewQuestion.prompt || 'The interview backend returned an empty question.'}</h3>

                      {interviewQuestion.category && <span className="panel-tag">{interviewQuestion.category}</span>}

                      <label className="field-label" htmlFor="interview-answer">Your answer</label>

                      <textarea id="interview-answer" className="text-area" rows={7} value={interviewAnswer} onChange={event => setInterviewAnswer(event.target.value)} placeholder="Structure your response clearly. Explain your reasoning and give examples where possible." />

                      <button className="primary-button" onClick={submitInterviewAnswer} disabled={busy || !interviewAnswer.trim()}>

                        <Sparkles size={17} /> {busy ? 'Evaluating...' : 'Submit answer'}

                      </button>

                    </div>

                  )}

                  {interviewFeedback && (

                    <div className="recommendation ai-explanation" style={{ marginTop: 18 }}>

                      <b>AI feedback on your last answer</b>

                      <pre className="json-result" style={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>{typeof interviewFeedback === 'string' ? interviewFeedback : JSON.stringify(interviewFeedback, null, 2)}</pre>

                    </div>

                  )}

                  {interviewFinished && (

                    <div className="recommendation" style={{ marginTop: 18 }}>

                      <b>Interview session complete</b>

                      <p>You have completed {interviewHistory.length} answer(s). Review the feedback above and practise again to improve.</p>

                    </div>

                  )}

                </div>

              )}



              <div className="three-tip-grid">

                <Tip icon={Target} title="Role-specific questions" text="Practise questions based on your target job role." />

                <Tip icon={BrainCircuit} title="Adaptive difficulty" text="The intended interview flow adjusts question difficulty as you progress." />

                <Tip icon={MessageSquareText} title="Answer feedback" text="Review strengths and improvement areas after each response." />

              </div>

            </section>

          )}



          {page === 'email' && (

            <section>

              <PageHeading eyebrow="HR COMMUNICATION INTELLIGENCE" title="Your HR inbox, organised." description="Track interview invitations, assessments, job offers and recruiter replies in one place." />

              <div className="panel resume-panel">

                <div className="panel-heading"><div className="heading-icon purple"><BriefcaseBusiness size={19} /></div><div><h3>Connect your Gmail account</h3><p>Organise recruitment-related emails in one place.</p></div><span className="panel-tag">GMAIL</span></div>

                <div className="privacy-note"><LockKeyhole size={16} /> Read-only Gmail access. Jobify cannot send or delete your emails.</div>

                <div className="email-actions">

                  <button className="primary-button" onClick={() => { window.location.href = `${API}/api/email/connect` }}><Link2 size={17} /> Connect Gmail <ArrowRight size={17} /></button>

                  <button className="secondary-button" onClick={loadGmail} disabled={gmailLoading}><RotateCcw size={16} /> {gmailLoading ? 'Checking...' : 'Check connection'}</button>

                  <button className="secondary-button" onClick={syncGmail} disabled={gmailLoading || !gmailConnected}>Sync emails</button>

                </div>

              </div>

              {gmailConnected && (

                <>

                  <div className="feature-grid">

                    <Stat title="Total emails" value={gmailStats?.total_emails ?? gmailEmails.length} />

                    <Stat title="Interviews" value={gmailStats?.categories?.INTERVIEW ?? 0} />

                    <Stat title="Assessments" value={gmailStats?.categories?.ASSESSMENT ?? 0} />

                    <Stat title="Job offers" value={gmailStats?.categories?.JOB_OFFER ?? 0} />

                  </div>

                  <div className="panel result-panel">

                    <h3>Saved HR emails</h3>

                    {gmailEmails.length ? gmailEmails.map((email, index) => (

                      <div className="indicator" key={email.id || email.message_id || index}>

                        <BriefcaseBusiness size={16} />

                        <span>{email.subject || email.snippet || 'Email without subject'}</span>

                        <span className="panel-tag">{email.category || 'OTHER'}</span>

                      </div>

                    )) : <p>No saved emails yet. Click Sync emails to fetch messages.</p>}

                  </div>

                </>

              )}

              <div className="three-tip-grid"><Tip icon={BriefcaseBusiness} title="Interview tracking" text="Identify interview invitations and recruiter communication." /><Tip icon={ClipboardCheck} title="Assessment tracking" text="Keep track of job assessments and related messages." /><Tip icon={CheckCircle2} title="Offer tracking" text="Organise job offers and recruitment updates." /></div>

            </section>

          )}



          <footer className="page-footer"><span>© 2026 Jobify</span><span><ShieldCheck size={14} /> Built for safer job searching</span><span className="footer-demo">Connected to local backend</span></footer>

        </div>

      </main>

    </div>

  )

}



function ResumeMatchResult({ data, onGenerateRoadmap, onSkipRoadmap, busy }) {
  const analysis = data?.skill_analysis || {}
  const similarity = data?.text_similarity || {}
  const matched = Array.isArray(analysis.matched_skills) ? analysis.matched_skills : []
  const missing = Array.isArray(analysis.missing_skills) ? analysis.missing_skills : []
  const required = Array.isArray(analysis.required_skills) ? analysis.required_skills : []
  const applicant = Array.isArray(analysis.applicant_skills) ? analysis.applicant_skills : []

  return (
    <div className="panel result-panel" style={{ marginTop: 20 }}>
      <span className="panel-tag">RESUME ANALYSIS</span>
      <h3 style={{ marginTop: 10 }}>Your resume match results</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12, margin: '16px 0' }}>
        <div style={{ background: '#f5f3ff', borderRadius: 12, padding: 16 }}>
          <div style={{ fontSize: 12, color: '#6b7280' }}>Text similarity</div>
          <strong style={{ display: 'block', fontSize: 28, color: '#6d28d9' }}>{similarity.match_score ?? '—'}{similarity.match_score != null ? '%' : ''}</strong>
          <small style={{ color: '#6b7280' }}>Not hiring probability</small>
        </div>
        <div style={{ background: '#eff6ff', borderRadius: 12, padding: 16 }}>
          <div style={{ fontSize: 12, color: '#6b7280' }}>Required skill coverage</div>
          <strong style={{ display: 'block', fontSize: 28, color: '#1d4ed8' }}>{analysis.skill_match_score ?? '—'}{analysis.skill_match_score != null ? '%' : ''}</strong>
          <small style={{ color: '#6b7280' }}>{matched.length} of {required.length} required skills matched</small>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
        <div>
          <h4>Matched skills ({matched.length})</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
            {matched.length ? matched.map(skill => <span key={skill} style={{ background: '#dcfce7', color: '#166534', borderRadius: 20, padding: '6px 10px', fontSize: 13 }}>{skill}</span>) : <span style={{ color: '#6b7280' }}>No matched skills listed.</span>}
          </div>
        </div>
        <div>
          <h4>Missing skills ({missing.length})</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
            {missing.length ? missing.map(skill => <span key={skill} style={{ background: '#fef3c7', color: '#92400e', borderRadius: 20, padding: '6px 10px', fontSize: 13 }}>{skill}</span>) : <span style={{ color: '#6b7280' }}>No missing required skills identified.</span>}
          </div>
        </div>
      </div>

      {applicant.length > 0 && (
        <div style={{ marginTop: 16 }}>
          <h4>Skills found in your resume</h4>
          <p style={{ color: '#64748b', lineHeight: 1.6 }}>{applicant.join(' · ')}</p>
        </div>
      )}

      <div style={{ marginTop: 20, padding: 18, borderRadius: 14, background: '#f8f7ff', border: '1px solid #e5e1ff' }}>
        <h3 style={{ margin: '0 0 6px' }}>Turn your skill gaps into a learning plan</h3>
        <p style={{ margin: '0 0 14px', color: '#64748b', lineHeight: 1.6 }}>
          Would you like Jobify's Career Coach to create a personalized roadmap using the missing skills from this resume analysis?
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          <button className="primary-button" onClick={onGenerateRoadmap} disabled={busy || missing.length === 0}>
            <Sparkles size={17} /> {busy ? 'Generating...' : 'Yes, create my roadmap'}
          </button>
          <button className="secondary-button" onClick={onSkipRoadmap} disabled={busy}>
            Not now
          </button>
        </div>
        {missing.length === 0 && <small style={{ display: 'block', marginTop: 10, color: '#64748b' }}>No missing skills were returned, so automatic roadmap generation is unavailable. You can still enter skills manually in Skill Coach.</small>}
      </div>

      <details style={{ marginTop: 16 }}>
        <summary style={{ cursor: 'pointer', color: '#64748b' }}>View complete backend response</summary>
        <pre className="json-result" style={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere', maxHeight: 320, overflow: 'auto' }}>{JSON.stringify(data, null, 2)}</pre>
      </details>
    </div>
  )
}

function ScamExplainability({ data }) {
  const ruleEvidence = Array.isArray(data?.rule_evidence) ? data.rule_evidence : []
  const ml = data?.ml_explanation || {}
  const fraudFeatures = Array.isArray(ml.fraud_contributors) ? ml.fraud_contributors : []
  const legitimateFeatures = Array.isArray(ml.legitimate_contributors) ? ml.legitimate_contributors : []

  const cardStyle = {
    marginTop: 18,
    padding: 20,
    border: '1px solid var(--border, #e8e4f2)',
    borderRadius: 14,
    background: 'var(--surface, #fff)',
    minWidth: 0
  }
  const evidenceStyle = {
    marginTop: 8,
    padding: '9px 12px',
    borderRadius: 8,
    background: '#fff1f1',
    border: '1px solid #f3d5d5',
    color: '#a83e49',
    overflowWrap: 'anywhere',
    fontSize: 13
  }
  const featureRow = (item, positive) => (
    <div key={`${item.feature}-${item.contribution}`} style={{
      display: 'flex',
      justifyContent: 'space-between',
      gap: 12,
      padding: '9px 0',
      borderBottom: '1px solid var(--border, #eee)',
      fontSize: 13
    }}>
      <span style={{ overflowWrap: 'anywhere' }}>{item.feature}</span>
      <b style={{ color: positive ? '#bd515b' : '#26845d', whiteSpace: 'nowrap' }}>
        {Number(item.contribution).toFixed(4)}
      </b>
    </div>
  )

  return (
    <div style={cardStyle}>
      <div className="section-kicker">MODEL TRANSPARENCY</div>
      <h3 style={{ margin: '5px 0 4px' }}>Why was this flagged?</h3>
      <p style={{ color: 'var(--muted, #777)', fontSize: 13, marginTop: 0 }}>
        Evidence from the rule engine and feature contributions from the trained ML model.
      </p>

      <div style={{ marginTop: 18 }}>
        <h4>Rule-based evidence</h4>
        {ruleEvidence.length ? ruleEvidence.map((item, index) => (
          <div key={`${item.name}-${index}`} style={{
            padding: 13,
            marginTop: 10,
            border: '1px solid var(--border, #e8e4f2)',
            borderRadius: 10
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
              <b>{item.name}</b>
              <span className="panel-tag">{item.severity || 'FLAGGED'} · Weight {item.weight ?? '—'}</span>
            </div>
            {item.explanation && <p style={{ fontSize: 13, margin: '8px 0' }}>{item.explanation}</p>}
            {Array.isArray(item.evidence) && item.evidence.length > 0 && (
              <>
                <small style={{ color: 'var(--muted, #777)' }}>Matched text</small>
                {item.evidence.map((phrase, phraseIndex) => (
                  <div key={`${phrase}-${phraseIndex}`} style={evidenceStyle}>“{phrase}”</div>
                ))}
              </>
            )}
          </div>
        )) : <p>No rule evidence returned.</p>}
      </div>

      <div style={{ marginTop: 22 }}>
        <h4>ML feature contributions</h4>
        <p style={{ fontSize: 12, color: 'var(--muted, #777)' }}>
          Positive values push the model toward fraud; negative values push it toward legitimate.
          These are decision-score contributions, not probabilities or proof.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 18 }}>
          <div>
            <b style={{ color: '#bd515b', fontSize: 13 }}>Fraud-driving features</b>
            {fraudFeatures.length ? fraudFeatures.map(item => featureRow(item, true)) : <p>No positive feature contributions.</p>}
          </div>
          <div>
            <b style={{ color: '#26845d', fontSize: 13 }}>Legitimate-driving features</b>
            {legitimateFeatures.length ? legitimateFeatures.map(item => featureRow(item, false)) : <p>No negative feature contributions.</p>}
          </div>
        </div>
      </div>
      <div className="demo-disclaimer" style={{ marginTop: 16 }}>
        Feature contributions describe this model's learned associations. They do not establish that a phrase or job posting is fraudulent.
      </div>
    </div>
  )
}

function DocumentResult({ data }) {

  const analysis = data?.analysis || {}

  const extraction = data?.extraction || {}

  const riskLevel = String(analysis.risk_level || 'UNKNOWN').toUpperCase()

  const riskClass = riskLevel === 'LOW' ? 'risk-low' : riskLevel === 'MEDIUM' ? 'risk-medium' : 'risk-high'

  const indicators = Array.isArray(analysis.indicators) ? analysis.indicators : []

  const explanation = analysis.gemini_analysis?.explanation



  return (

    <div className="panel result-panel document-result" style={{ minWidth: 0, maxWidth: '100%', overflow: 'hidden' }}>

      <div className="result-header">

        <div>

          <span className="section-kicker">DOCUMENT SCAN COMPLETE</span>

          <h3 style={{ overflowWrap: 'anywhere' }}>{data.filename || 'Uploaded document'}</h3>

          <p style={{ marginTop: 6, color: 'var(--muted, #777)' }}>

            {extraction.method || 'Document parser'} · {extraction.character_count ?? 0} characters extracted

          </p>

        </div>

        <span className={riskClass}>{riskLevel} RISK</span>

      </div>



      {analysis.risk_score !== undefined && (

        <div className="result-grid" style={{ minWidth: 0 }}>

          <div className="score-card">

            <div className="score-ring">

              <strong>{Number(analysis.risk_score).toFixed(2)}</strong>

              <small>/100</small>

            </div>

            <span className={riskClass}>{riskLevel} RISK</span>

            <p>{analysis.category || 'Unclassified'}</p>

          </div>

          <div className="result-details" style={{ minWidth: 0, overflowWrap: 'anywhere' }}>

            <h4>Potential warning signs</h4>

            {indicators.length > 0 ? indicators.map((item, index) => (

              <div className="indicator" key={`${item.name || 'indicator'}-${index}`}>

                <AlertTriangle size={16} />

                <span style={{ overflowWrap: 'anywhere' }}>{item.name || 'Warning indicator'}</span>

                {item.weight !== undefined && <span className="indicator-weight">{item.weight}</span>}

              </div>

            )) : <p>No obvious rule-based warning indicators were detected.</p>}

            {analysis.recommendation && (

              <div className="recommendation">

                <b>Recommended next step</b>

                <p>{analysis.recommendation}</p>

              </div>

            )}

          </div>

        </div>

      )}



      {explanation && (

        <div className="recommendation ai-explanation" style={{ minWidth: 0, overflowWrap: 'anywhere' }}>

          <b>AI explanation</b>

          <p style={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere', wordBreak: 'break-word', fontSize: 15, lineHeight: 1.85, color: '#514968' }}>{explanation}</p>

          {analysis.gemini_analysis?.provider && <small>AI provider: {analysis.gemini_analysis.provider}</small>}

        </div>

      )}



      {extraction.extracted_text && (

        <details style={{ marginTop: 20, minWidth: 0 }}>

          <summary style={{ cursor: 'pointer', fontWeight: 600, padding: '12px 0' }}>

            View extracted document text

          </summary>

          <div

            style={{

              boxSizing: 'border-box',

              width: '100%',

              maxWidth: '100%',

              maxHeight: 260,

              overflowY: 'auto',

              overflowX: 'hidden',

              whiteSpace: 'pre-wrap',

              overflowWrap: 'anywhere',

              wordBreak: 'break-word',

              background: 'var(--surface-soft, #f7f6fb)',

              border: '1px solid var(--border, #e8e4f2)',

              borderRadius: 12,

              padding: 16,

              fontSize: 13,

              lineHeight: 1.65

            }}

          >

            {extraction.extracted_text}

          </div>

        </details>

      )}



      <div className="demo-disclaimer" style={{ overflowWrap: 'anywhere' }}>

        Automated screening is a decision-support aid, not proof that a document or employer is fraudulent or legitimate.

      </div>

    </div>

  )

}



function RoadmapResult({ data }) {
  const roadmapText = typeof data?.roadmap?.roadmap === 'string'
    ? data.roadmap.roadmap
    : typeof data?.roadmap === 'string'
      ? data.roadmap
      : typeof data?.message === 'string'
        ? data.message
        : '';

  const firstStep = roadmapText.search(/^\s*\d+\.\s+\*\*/m);
  const structuredText = firstStep >= 0 ? roadmapText.slice(firstStep) : roadmapText;
  const steps = structuredText
    .split(/(?=^\s*\d+\.\s+\*\*)/m)
    .map(part => part.trim())
    .filter(Boolean);

  if (!roadmapText) {
    return (
      <div className="recommendation">
        <b>Roadmap response received</b>
        <p>The backend responded, but the roadmap text was not in the expected format.</p>
        <pre className="json-result" style={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>{JSON.stringify(data, null, 2)}</pre>
      </div>
    );
  }

  return (
    <div className="roadmap-result" style={{ display: 'grid', gap: 14, marginTop: 16 }}>
      <div className="roadmap-status" style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#21845b', fontWeight: 600, fontSize: 13 }}>
        <CheckCircle2 size={16} /> Personalised roadmap generated
      </div>
      {steps.map((step, index) => {
        const cleaned = step.replace(/^\d+\.\s*/, '').replace(/\*\*/g, '').replace(/^---+$/gm, '').trim();
        const lines = cleaned.split('\n').map(line => line.trim()).filter(Boolean);
        const heading = lines.shift() || `Learning step ${index + 1}`;
        const body = lines.join('\n').replace(/^[-*]\s*/gm, '');
        return (
          <article key={index} className="panel roadmap-step" style={{ padding: 16, border: '1px solid var(--border, #e8e4f2)', borderRadius: 14, boxShadow: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <span style={{ width: 30, height: 30, flex: '0 0 30px', display: 'grid', placeItems: 'center', borderRadius: 10, background: '#eee8ff', color: '#7652d6', fontWeight: 700 }}>{index + 1}</span>
              <h4 style={{ margin: 0 }}>{heading}</h4>
            </div>
            <p style={{ whiteSpace: 'pre-wrap', lineHeight: 1.75, margin: 0, color: 'var(--muted, #655d75)' }}>{body.replace(/\*\*/g, '')}</p>
          </article>
        );
      })}
      <details style={{ marginTop: 2 }}>
        <summary style={{ cursor: 'pointer', color: 'var(--muted, #766d88)', fontSize: 12 }}>View raw backend response</summary>
        <pre className="json-result" style={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>{JSON.stringify(data, null, 2)}</pre>
      </details>
    </div>
  );
}


function ResultObject({ title, data }) {

  return (

    <div className="panel result-panel">

      <span className="section-kicker">BACKEND RESPONSE</span>

      <h3>{title}</h3>

      <pre className="json-result" style={{ maxWidth: "100%", overflowX: "auto", whiteSpace: "pre-wrap", overflowWrap: "anywhere", wordBreak: "break-word" }}>{JSON.stringify(data, null, 2)}</pre>

    </div>

  )

}

function InterviewFeedbackView({ feedback }) {
  const data = typeof feedback === 'string'
    ? { feedback }
    : feedback || {};

  const getText = (value) => {
    if (typeof value === 'string') return value;
    if (Array.isArray(value)) return value.join('\n');
    return '';
  };

  const score = data.score ?? data.rating;

  const strengths = data.strengths || [];
  const improvements =
    data.improvements || data.areas_to_improve || [];

  const overall =
    data.overall_feedback ||
    data.feedback ||
    data.explanation;

  const suggested =
    data.ideal_answer ||
    data.suggested_answer ||
    data.model_answer;

  return (
    <div className="panel result-panel" style={{ marginTop: 18 }}>
      <span className="section-kicker">AI EVALUATION</span>
      <h3>Your answer feedback</h3>

      {score !== undefined && (
        <div className="score-card">
          <div className="score-ring">
            <strong>{score}</strong>
          </div>
          <p>Answer score</p>
        </div>
      )}

      {overall && (
        <div className="recommendation ai-explanation">
          <b>Overall feedback</b>
          <p>{getText(overall)}</p>
        </div>
      )}

      {strengths.length > 0 && (
        <div className="recommendation">
          <b>What you did well</b>
          {strengths.map((item, i) => (
            <p key={i}>✓ {getText(item)}</p>
          ))}
        </div>
      )}

      {improvements.length > 0 && (
        <div className="recommendation">
          <b>Areas to improve</b>
          {improvements.map((item, i) => (
            <p key={i}>• {getText(item)}</p>
          ))}
        </div>
      )}

      {suggested && (
        <div className="recommendation ai-explanation">
          <b>Suggested answer</b>
          <p style={{ whiteSpace: 'pre-wrap' }}>
            {getText(suggested)}
          </p>
        </div>
      )}
    </div>
  );
}




function Stat({ title, value }) {

  return <div className="panel"><h3>{title}</h3><h2>{value}</h2></div>

}



function PageHeading({ eyebrow, title, description }) {

  return <div className="page-heading"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{description}</p></div><div className="heading-badge"><ShieldCheck size={17} /> Safety-first tools</div></div>

}



function Tip({ icon: Icon, title, text }) {

  return <div className="tip-card"><div className="tip-icon"><Icon size={18} /></div><b>{title}</b><p>{text}</p></div>

}



function Overview({ setPage }) {

  return (

    <section>

      <div className="hero-panel">

        <div className="hero-copy">

          <div className="eyebrow"><span className="eyebrow-dot" /> YOUR CAREER, WITH MORE CONFIDENCE</div>

          <h1>Make your next career move<br /><span className="gradient-text">a safer one.</span></h1>

          <p className="hero-description">Spot suspicious job offers, review documents, and find your next skill to build — all in one workspace.</p>

          <div className="hero-actions"><button className="primary-button" onClick={() => setPage('scan')}><ScanSearch size={17} /> Check a job message <ArrowRight size={17} /></button><button className="secondary-button" onClick={() => setPage('resume')}>Match my resume <ArrowUpRight size={16} /></button></div>

          <div className="hero-proof"><span><CheckCircle2 size={15} /> Explainable checks</span><span><CheckCircle2 size={15} /> Career-focused tools</span></div>

        </div>

        <div className="hero-visual" aria-hidden="true"><div className="visual-ring ring-one" /><div className="visual-ring ring-two" /><div className="visual-ring ring-three" /><div className="visual-orbit orbit-one"><span className="orbit-ball ball-one" /><span className="orbit-ball ball-two" /></div><div className="visual-orbit orbit-two"><span className="orbit-ball ball-three" /><span className="orbit-ball ball-four" /></div><div className="visual-core"><ShieldCheck size={56} strokeWidth={1.6} /></div><div className="float-chip chip-top"><span className="chip-dot green" /> Safety check <b>Ready</b></div><div className="float-chip chip-bottom"><Sparkles size={14} /> Explainable AI</div></div>

      </div>

      <div className="section-title-row"><div><div className="eyebrow">YOUR WORKSPACE</div><h2>Tools for every step</h2><p>Practical checks to help you make informed career decisions.</p></div><span className="section-count">06 TOOLS</span></div>

      <div className="feature-grid">

        <Feature icon={ScanSearch} color="purple" tag="CORE TOOL" title="Scam detector" text="Check a suspicious message for warning signs and a risk explanation." action="Check a message" onClick={() => setPage('scan')} />

        <Feature icon={FileSearch} color="blue" title="Document scan" text="Upload a job offer document for text extraction and review." action="Scan a document" onClick={() => setPage('document')} />

        <Feature icon={FileText} color="pink" title="Resume matcher" text="Compare your resume against a target job description." action="Match resume" onClick={() => setPage('resume')} />

        <Feature icon={GraduationCap} color="peach" title="Skill coach" text="Turn missing skills into a structured learning roadmap." action="Plan learning" onClick={() => setPage('coach')} />

        <Feature icon={ClipboardCheck} color="blue" title="AI mock interview" text="Practise role-specific HR and technical interview questions." action="Start practising" onClick={() => setPage('interview')} />

        <Feature icon={BriefcaseBusiness} color="purple" title="HR email intelligence" text="Organise interviews, assessments and offers from Gmail." action="Connect Gmail" onClick={() => setPage('email')} />

      </div>

      <div className="bottom-grid">

        <div className="panel trust-panel"><div className="trust-icon"><ShieldCheck size={20} /></div><div><h3>Stay in control of your career</h3><p>Use these tools as a second opinion. Verify employers through independent, trusted sources before sharing money or personal information.</p></div><button className="text-button" onClick={() => setPage('scan')}>Start a check <ArrowRight size={15} /></button></div>

        <div className="panel quick-panel"><div className="quick-heading"><div><h3>Before you apply</h3><p>A quick safety checklist</p></div><ClipboardCheck size={19} /></div><div className="quick-item"><CircleCheck size={16} /> Verify the company's official website</div><div className="quick-item"><CircleCheck size={16} /> Never pay to secure a job</div><div className="quick-item"><CircleCheck size={16} /> Be cautious with urgent requests</div></div>

      </div>

    </section>

  )

}



function Feature({ icon: Icon, color, tag, title, text, action, onClick }) {

  return <button className="feature-card" onClick={onClick}><div className={`feature-icon ${color}`}><Icon size={20} /></div><div className="feature-meta">{tag || 'CAREER TOOL'}</div><h3>{title}</h3><p>{text}</p><span className="feature-action">{action}<ArrowRight size={15} /></span></button>

}



createRoot(document.getElementById('root')).render(<App />)
