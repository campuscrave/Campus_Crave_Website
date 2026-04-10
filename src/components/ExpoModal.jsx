import { useState, useEffect } from 'react';
import FoodItem from './FoodItem';
import SwipeButton from './SwipeButton';
import OrderConfirmation from './OrderConfirmation';

// ─── Food items catalogue ──────────────────────────────────────────────────────

const FOOD_ITEMS = [
  {
    id: 'pizza',
    name: 'Stella Margherita Pizza',
    description: 'Classic margherita pizza slice — fresh tomato sauce, melted mozzarella, basil. Catered by our restaurant partners.',
    emoji: '🍕',
    stock: 90,
    tag: 'Catered',
    restaurant: 'Catered',
  },
  {
    id: 'wrap',
    name: 'CRG Signature Wraps',
    description: 'Choose your wrap:\n• Club Wrap — bacon, cheese, lettuce, tomato, chicken\n• Alamo Wrap — onions, peppers, mushrooms, chicken, cheese',
    emoji: '🌯',
    stock: 90,
    tag: 'Catered',
    restaurant: 'Catered',
  },
];

const STEPS_WITH_PROGRESS = [
  'welcome',
  'student-form',
  'student-questions',
  'professor-form',
  'professor-questions',
  'visitor-form',
  'visitor-questions',
];

const STEP_NUM = {
  welcome: 1,
  'student-form': 2,
  'student-questions': 3,
  'professor-form': 2,
  'professor-questions': 3,
  'visitor-form': 2,
  'visitor-questions': 3,
};

const TOTAL_STEPS = 3;

// ─── Shared style tokens ───────────────────────────────────────────────────────

const s = {
  title: {
    fontSize: '1.5rem',
    fontWeight: 700,
    color: '#0C0118',
    marginBottom: '0.5rem',
  },
  subtitle: {
    fontSize: '0.875rem',
    color: '#6B7280',
    marginBottom: '1.5rem',
    lineHeight: 1.5,
  },
  label: {
    display: 'block',
    fontSize: '13px',
    color: '#374151',
    marginBottom: '6px',
    fontWeight: 500,
  },
  input: {
    width: '100%',
    padding: '0.75rem 1rem',
    borderRadius: '10px',
    border: '1.5px solid #E5E7EB',
    background: '#F9FAFB',
    color: '#0C0118',
    fontSize: '16px',
    outline: 'none',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    boxSizing: 'border-box',
    transition: 'border-color 150ms',
  },
  inputError: { borderColor: '#EF4444' },
  errorMsg: { fontSize: '12px', color: '#EF4444', marginTop: '4px' },
  primaryBtn: {
    width: '100%',
    padding: '0.875rem',
    borderRadius: '12px',
    background: '#6B21A8',
    color: 'white',
    fontWeight: 600,
    fontSize: '1rem',
    border: 'none',
    cursor: 'pointer',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    transition: 'background 150ms',
  },
  backBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    background: 'none',
    border: 'none',
    color: '#6B7280',
    fontSize: '13px',
    cursor: 'pointer',
    padding: '0 0 1rem 0',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  optionBtn: (selected) => ({
    padding: '0.6rem 1rem',
    borderRadius: '8px',
    border: `1.5px solid ${selected ? '#6B21A8' : '#E5E7EB'}`,
    background: selected ? 'rgba(107,33,168,0.08)' : '#F9FAFB',
    color: selected ? '#6B21A8' : '#374151',
    fontSize: '13px',
    cursor: 'pointer',
    textAlign: 'left',
    width: '100%',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    transition: 'all 120ms',
  }),
};

// ─── Main component ────────────────────────────────────────────────────────────

export default function ExpoModal({ isOpen, onClose, onOrderComplete }) {
  // ── Modal lifecycle ──
  const [currentStep, setCurrentStep] = useState('reward');

  // ── Lead data ──
  const [userType, setUserType] = useState(null);
  const [leadId, setLeadId] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    fullName: '',
    email: '',
    role: '',
    q1Answer: '',
    q2Answer: '',
    q3Answer: '',
  });

  // ── Form validation errors (lifted from inner components) ──
  const [errors, setErrors] = useState({});

  // ── Steps 4-6 state ──
  const [selectedItem, setSelectedItem] = useState(null);
  const [stockLevels, setStockLevels] = useState([]);
  const [loadingStock, setLoadingStock] = useState(false);
  const [orderNumber, setOrderNumber] = useState(null);
  const [orderError, setOrderError] = useState(null);

  // ── Swipe step ──
  const [swipeLoading, setSwipeLoading] = useState(false);
  const [swipeErrMsg, setSwipeErrMsg] = useState('');
  const [swipeKey, setSwipeKey] = useState(0);

  // ── Sold-out waitlist ──
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [waitlistDone, setWaitlistDone] = useState(false);

  // ── Survey submission error ──
  const [surveyError, setSurveyError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // ── Reset state when modal opens (restore session progress if available) ──
  useEffect(() => {
    if (isOpen) {
      let restored = false;
      try {
        const saved = sessionStorage.getItem('cc_survey_progress');
        if (saved) {
          const progress = JSON.parse(saved);
          const UNSAFE_STEPS = ['ordering', 'swipe', 'confirmation'];
          const restoredStep = UNSAFE_STEPS.includes(progress.currentStep)
            ? (progress.userType === 'student' ? 'student-questions' : progress.userType === 'professor' ? 'professor-questions' : progress.userType === 'visitor' ? 'visitor-questions' : 'welcome')
            : progress.currentStep;
          if (restoredStep && restoredStep !== 'confirmation') {
            setCurrentStep(restoredStep);
            setFormData((prev) => ({ ...prev, ...progress.formData }));
            setUserType(progress.userType ?? null);
            restored = true;
          }
        }
      } catch (_e) { /* ignore */ }

      if (!restored) {
        setCurrentStep('reward');
        setUserType(null);
        setFormData({ firstName: '', fullName: '', email: '', role: '', q1Answer: '', q2Answer: '', q3Answer: '' });
      }
      // These always reset — never persist sensitive or transient state
      setLeadId(null);
      setErrors({});
      setSelectedItem(null);
      setStockLevels([]);
      setOrderNumber(null);
      setOrderError(null);
      setSwipeErrMsg('');
      setWaitlistEmail('');
      setWaitlistDone(false);
      setSurveyError(null);
    }
  }, [isOpen]);

  // ── Fetch stock when entering ordering step ──
  useEffect(() => {
    if (currentStep !== 'ordering') return;
    setLoadingStock(true);
    (async () => {
      try {
        const levels = window.__db && window.__db.getStockLevels
          ? await window.__db.getStockLevels()
          : FOOD_ITEMS.map((item) => ({ item_name: item.name, remaining_stock: 90, is_active: true }));
        setStockLevels(levels);
      } catch (_e) {
        setStockLevels([]);
      } finally {
        setLoadingStock(false);
      }
    })();
  }, [currentStep]);

  // ── Persist survey progress to sessionStorage ──
  useEffect(() => {
    try {
      sessionStorage.setItem('cc_survey_progress', JSON.stringify({ currentStep, formData, userType }));
    } catch (_e) { /* ignore */ }
  }, [currentStep, formData, userType]);

  // ── Confirmation step effect (lifted from inner StepConfirmation) ──
  useEffect(() => {
    if (currentStep !== 'confirmation') return;
    try { sessionStorage.removeItem('cc_survey_progress'); } catch (_e) { /* ignore */ }
    (async () => {
      try {
        if (window.__db && window.__db.getOrderCount) {
          const count = await window.__db.getOrderCount();
          window.dispatchEvent(new CustomEvent('cc:order_count', { detail: { count } }));
        }
      } catch (_e) { /* non-critical */ }
    })();
  }, [currentStep]);

  // ── Helpers ──

  const updateForm = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isEduEmail = (email) => email.trim().toLowerCase().endsWith('.edu');

  const getSoldOut = (itemName) => {
    const level = stockLevels.find((lvl) => lvl.item_name === itemName);
    return level ? level.remaining_stock === 0 : false;
  };

  const allSoldOut = FOOD_ITEMS.every((item) => getSoldOut(item.name));

  const shouldShowProgress = STEPS_WITH_PROGRESS.includes(currentStep);
  const currentStepNum = STEP_NUM[currentStep] || 1;
  const showClose = currentStep !== 'confirmation' && currentStep !== 'reward';

  // ── Student form handler ──
  const handleStudentNext = () => {
    const errs = {};
    if (!formData.firstName.trim()) errs.firstName = 'First name is required';
    if (!formData.email.trim()) errs.email = 'Email is required';
    else if (!isValidEmail(formData.email)) errs.email = 'Enter a valid email';
    else if (!isEduEmail(formData.email)) errs.email = 'Please use your .edu university email';
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setCurrentStep('student-questions');
  };

  // ── Professor form handler ──
  const handleProfessorNext = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full name is required';
    if (!formData.email.trim()) errs.email = 'Email is required';
    else if (!isValidEmail(formData.email)) errs.email = 'Enter a valid email';
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setCurrentStep('professor-questions');
  };

  // ── Visitor / Investor form handler ──
  const handleVisitorNext = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full name is required';
    if (!formData.email.trim()) errs.email = 'Email is required';
    else if (!isValidEmail(formData.email)) errs.email = 'Enter a valid email';
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setCurrentStep('visitor-questions');
  };

  // ── Shared lead-save helper ──
  // Returns true if the caller should advance to ordering, false if it should stop.
  const saveLeadAndAdvance = async (leadPayload) => {
    setSurveyError(null);
    setIsSaving(true);
    const safetyTimeout = setTimeout(() => { setIsSaving(false); }, 15000);
    try {
      if (!window.__db || typeof window.__db.createLead !== 'function') {
        setSurveyError('App not loaded correctly. Please refresh and try again.');
        return false;
      }
      const result = await window.__db.createLead(leadPayload);
      if (result && result.error === 'duplicate') { setCurrentStep('already-ordered'); return false; }
      if (result && result.leadId) {
        setLeadId(result.leadId);
      } else {
        // createLead returned but gave no leadId — surface the error so the
        // user can retry rather than proceeding with a null lead_id.
        const msg = (result && result.error) ? result.error : 'unknown';
        console.error('[CampusCrave] createLead failed:', msg);
        setSurveyError('Could not save your info. Please try again.');
        return false;
      }
      return true;
    } catch (e) {
      console.error('[CampusCrave] createLead threw:', e);
      setSurveyError('Network error — please check your connection and try again.');
      return false;
    } finally {
      clearTimeout(safetyTimeout);
      setIsSaving(false);
    }
  };

  // ── Student survey submit ──
  const handleStudentSave = async () => {
    const ok = await saveLeadAndAdvance({
      type: 'student',
      firstName: formData.firstName,
      email: formData.email,
      q1: formData.q1Answer,
      q2: formData.q2Answer,
      q3: formData.q3Answer,
    });
    if (ok) setCurrentStep('ordering');
  };

  // ── Professor survey submit ──
  const handleProfessorSave = async () => {
    const ok = await saveLeadAndAdvance({
      type: 'professor',
      fullName: formData.fullName,
      email: formData.email,
      q1: formData.q1Answer,
      q2: formData.q2Answer,
      q3: formData.q3Answer,
    });
    if (ok) setCurrentStep('ordering');
  };

  // ── Investor survey submit ──
  const handleVisitorSave = async () => {
    const ok = await saveLeadAndAdvance({
      type: 'investor',
      fullName: formData.fullName,
      email: formData.email,
      role: formData.role,
      q1: formData.q1Answer,
      q2: formData.q2Answer,
      q3: formData.q3Answer,
    });
    if (ok) setCurrentStep('ordering');
  };

  // ── Swipe success handler ──
  const handleSwipeSuccess = async () => {
    setSwipeLoading(true);
    setSwipeErrMsg('');
    try {
      // Pre-check stock before hitting createOrder — if we can read it and it's 0, bail early.
      // If getStockLevels throws, we fall through and let decrement_stock handle it server-side.
      if (window.__db && window.__db.getStockLevels && selectedItem) {
        try {
          const levels = await window.__db.getStockLevels();
          const level = levels.find((l) => l.item_name === selectedItem.name);
          if (level && level.remaining_stock <= 0) {
            setSwipeErrMsg('Sorry, this item just sold out! Please go back and pick another option.');
            setSwipeKey((k) => k + 1);
            return;
          }
        } catch (_stockErr) {
          // Stock check failed — proceed anyway, server-side will enforce
        }
      }

      if (window.__db && window.__db.createOrder) {
        const result = await window.__db.createOrder({
          leadId: leadId,
          leadEmail: formData.email,
          itemName: selectedItem.name,
          restaurant: selectedItem.restaurant,
        });
        if (result && result.error === 'sold_out') {
          setSwipeKey((k) => k + 1);
          setOrderError('sold_out');
          setCurrentStep('ordering');
        } else if (result && result.orderNumber) {
          setOrderNumber(result.orderNumber);
          setCurrentStep('confirmation');
        } else {
          const errDetail = result && result.error ? result.error : 'unknown';
          console.error('[CampusCrave] createOrder failed:', errDetail);
          setSwipeErrMsg('Something went wrong. Tap to try again.');
          setSwipeKey((k) => k + 1);
        }
      } else {
        setSwipeErrMsg('Something went wrong. Please ask a CampusCrave team member for help.');
        setSwipeKey((k) => k + 1);
      }
    } catch (e) {
      console.error('[CampusCrave] createOrder threw:', e);
      setSwipeErrMsg('Something went wrong. Tap to try again.');
      setSwipeKey((k) => k + 1);
    } finally {
      setSwipeLoading(false);
    }
  };

  // ─── Root render ───────────────────────────────────────────────────────────

  if (!isOpen) return null;

  const studentQuestions = [
    {
      key: 'q1Answer',
      question: 'What year are you in?',
      options: ['Freshman', 'Sophomore', 'Junior', 'Senior'],
    },
    {
      key: 'q2Answer',
      question: "What's your biggest frustration with campus dining?",
      options: ['Limited hours', 'Poor variety', 'Wasted meal plan', 'Too expensive', 'Other'],
    },
    {
      key: 'q3Answer',
      question: 'If CampusCrave became a paid add-on to your meal plan — letting you use Spartan Dollars at off-campus restaurants — would you take part?',
      options: ['Definitely yes 🙌', 'Probably yes', 'Not sure', 'No thanks'],
    },
  ];

  const professorQuestions = [
    {
      key: 'q1Answer',
      question: "What's your department or area?",
      options: ['STEM', 'Business', 'Arts & Humanities', 'Social Sciences', 'Other'],
    },
    {
      key: 'q2Answer',
      question: 'How often do you hold team lunches or staff meetings near campus?',
      options: ['Rarely', '1–2× a month', 'Weekly', 'Very often'],
    },
    {
      key: 'q3Answer',
      question: 'Would dining credits for off-campus restaurant meetings improve your work experience at UT?',
      options: ['Definitely yes 🙌', 'Probably yes', 'Not sure', 'No thanks'],
    },
  ];

  const isParentInvestor = formData.q1Answer === 'Parent of a student';
  const visitorQuestions = [
    {
      key: 'q1Answer',
      question: "What's your connection to campus life?",
      options: ['Parent of a student', 'Faculty or Admin', 'Entrepreneur', 'VC or Investor', 'Just curious 👀'],
      onChange: (val) => {
        const wasParent = formData.q1Answer === 'Parent of a student';
        const willBeParent = val === 'Parent of a student';
        if (wasParent !== willBeParent) updateForm('q2Answer', '');
        updateForm('q1Answer', val);
      },
    },
    {
      key: 'q2Answer',
      question: isParentInvestor
        ? 'How aware are you of how much your student spends on off-campus dining?'
        : 'What sector do you primarily operate or invest in?',
      options: isParentInvestor
        ? ['Very aware', 'Somewhat aware', 'Honestly, no idea']
        : ['EdTech', 'FoodTech', 'Consumer apps', 'Other'],
    },
    {
      key: 'q3Answer',
      question: `Would a prepaid off-campus dining plan — trackable by parents, usable by students — be something you'd support or fund?`,
      options: ['Very interested 🔥', 'Somewhat interested', 'Not for me'],
    },
  ];

  const allStudentAnswered = !!(formData.q1Answer && formData.q2Answer && formData.q3Answer);
  const allProfessorAnswered = !!(formData.q1Answer && formData.q2Answer && formData.q3Answer);
  const allVisitorAnswered = !!(formData.q1Answer && formData.q2Answer && formData.q3Answer);

  const backStep =
    userType === 'student'
      ? 'student-questions'
      : userType === 'professor'
      ? 'professor-questions'
      : 'visitor-questions';

  const firstName =
    formData.firstName ||
    (formData.fullName ? formData.fullName.split(' ')[0] : '') ||
    'Friend';

  const surveySteps = ['student-questions', 'professor-questions', 'visitor-questions', 'student-form', 'professor-form', 'visitor-form'];
  const hasStartedSurvey =
    surveySteps.includes(currentStep) &&
    !!(formData.q1Answer || formData.q2Answer || formData.q3Answer || formData.firstName || formData.fullName || formData.email) ||
    currentStep === 'ordering';

  const handleClose = () => {
    if (hasStartedSurvey) {
      if (window.confirm('Are you sure you want to leave? You\'ll lose your progress.')) {
        try { sessionStorage.removeItem('cc_survey_progress'); } catch (_e) { /* ignore */ }
        onClose();
      }
    } else {
      try { sessionStorage.removeItem('cc_survey_progress'); } catch (_e) { /* ignore */ }
      onClose();
    }
  };

  return (
    <>
      <style>{`
        @keyframes cc-pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.35; }
        }
      `}</style>

      <div
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            sessionStorage.setItem('cc_modal_dismissed', 'true');
            handleClose();
          }
        }}
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          background: 'rgba(0,0,0,0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
        }}
      >
        {/* Clean popup card — clicks don't bubble to overlay */}
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            width: '100%',
            maxWidth: '420px',
            background: '#ffffff',
            borderRadius: '24px',
            overflow: 'hidden',
            position: 'relative',
            boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            maxHeight: 'min(90dvh, 90vh)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {showClose && (
            <button
              onClick={handleClose}
              aria-label="Close"
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                zIndex: 20,
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'rgba(0,0,0,0.08)',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#374151',
                transition: 'background 150ms',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.14)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.08)')}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          )}

          {/* ── STEP: reward ── */}
          {currentStep === 'reward' && (
            <div style={{padding:0,overflow:'hidden'}}>
              <div style={{
                background:'linear-gradient(135deg,#4C1D95 0%,#6B21A8 50%,#8B5CF6 100%)',
                padding:'2rem 1.5rem 1.5rem',
                textAlign:'center',
                position:'relative',
              }}>
                <button
                  onClick={()=>{try{sessionStorage.removeItem('cc_survey_progress');}catch(_e){}sessionStorage.setItem('cc_modal_dismissed','true');onClose();}}
                  style={{position:'absolute',top:12,right:12,width:44,height:44,borderRadius:'50%',background:'rgba(255,255,255,0.2)',border:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:14,fontWeight:700}}
                >✕</button>
                <div style={{width:48,height:48,borderRadius:'50%',background:'#22C55E',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 0.75rem',fontSize:'1.5rem'}}>✓</div>
                <div style={{fontSize:'1.5rem',fontWeight:800,color:'white',letterSpacing:'-0.02em',fontFamily:'Outfit,sans-serif'}}>Your Reward Awaits ✦</div>
                <div style={{background:'linear-gradient(135deg,rgba(255,255,255,0.18),rgba(255,255,255,0.08))',border:'1px solid rgba(255,255,255,0.25)',borderRadius:16,padding:'1.25rem',marginTop:'1rem',backdropFilter:'blur(8px)'}}>
                  {/* Venture Expo badge — first visible element on the reward card */}
                  <div style={{display:'flex',justifyContent:'center',marginBottom:'0.875rem'}}>
                    <div style={{
                      background:'rgba(147,51,234,0.15)',
                      border:'1px solid rgba(147,51,234,0.5)',
                      borderRadius:'20px',
                      padding:'6px 16px',
                      display:'inline-flex',
                      alignItems:'center',
                      gap:'6px',
                    }}>
                      <span style={{fontSize:'10px',color:'#C084FC',fontWeight:700,letterSpacing:'0.1em'}}>
                        🏛️ NEW VENTURE EXPO · UNIVERSITY OF TAMPA
                      </span>
                    </div>
                  </div>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
                    <div>
                      <div style={{fontSize:11,color:'rgba(255,255,255,0.7)',fontWeight:500,textTransform:'uppercase',letterSpacing:'0.08em'}}>Total Value</div>
                      <div style={{fontSize:'2.25rem',fontWeight:800,color:'white',lineHeight:1.1,marginTop:4}}>FREE</div>
                      <div style={{fontSize:13,color:'rgba(255,255,255,0.8)',marginTop:4}}>One complimentary order</div>
                      <p style={{fontSize:'11px',color:'rgba(255,255,255,0.5)',marginTop:'4px'}}>First orders at the University of Tampa</p>
                    </div>
                    <img src="/logo.jpeg" alt="CampusCrave" style={{ height: '24px', objectFit: 'contain' }} />
                  </div>
                  <div style={{borderTop:'1px dashed rgba(255,255,255,0.25)',margin:'1rem 0 0.75rem'}} />
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <div style={{fontSize:12,color:'rgba(255,255,255,0.85)',fontWeight:700}}>1 per student</div>
                  </div>
                </div>
              </div>
              <div style={{background:'#ffffff',padding:'1.25rem 1.5rem 1.5rem'}}>
                <div style={{fontSize:'1rem',fontWeight:700,color:'#0C0118',textAlign:'center'}}>Claim your free order now</div>
                <div style={{fontSize:13,color:'#6B7280',textAlign:'center',marginTop:4}}>Answer 3 quick questions. Swipe to claim. Pick up at our booth.</div>
                <div style={{display:'flex',justifyContent:'center',gap:8,marginTop:'0.875rem'}}>
                  {['📝 3 questions','👆 Swipe','🍕 Pick up'].map((pill,i)=>(
                    <div key={i} style={{fontSize:11,color:'#6B21A8',background:'rgba(107,33,168,0.08)',borderRadius:20,padding:'3px 10px',fontWeight:500}}>{pill}</div>
                  ))}
                </div>
                <button
                  onClick={()=>setCurrentStep('welcome')}
                  style={{width:'100%',marginTop:'1rem',padding:'1rem',background:'linear-gradient(135deg,#6B21A8,#8B5CF6)',border:'none',borderRadius:14,color:'white',fontSize:'1rem',fontWeight:700,cursor:'pointer',letterSpacing:'-0.01em',boxShadow:'0 4px 20px rgba(107,33,168,0.4)'}}
                >Claim My Free Order →</button>
                <div style={{fontSize:11,color:'#9CA3AF',textAlign:'center',marginTop:'0.625rem'}}>🔒 No spam. Just your order confirmation.</div>
              </div>
            </div>
          )}

          {currentStep !== 'confirmation' && currentStep !== 'reward' && (
            <div className="phone-screen-scroll" style={{ padding: '1.5rem', paddingTop: '1rem', overflowY: 'auto', flex: 1, scrollbarWidth: 'none', msOverflowStyle: 'none' }}>

              {/* Progress dots */}
              {shouldShowProgress && (
                <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '1.5rem' }}>
                  {Array.from({ length: TOTAL_STEPS }, (_, i) => (
                    <div
                      key={i}
                      style={{
                        width: i + 1 === currentStepNum ? '24px' : '8px',
                        height: '8px',
                        borderRadius: '4px',
                        background: i + 1 <= currentStepNum ? '#6B21A8' : '#E5E7EB',
                        transition: 'all 250ms ease',
                      }}
                    />
                  ))}
                </div>
              )}

              {/* ── STEP: welcome ── */}
              {currentStep === 'welcome' && (
                <div>
                  <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>🎉</div>
                    <div style={{ ...s.title, textAlign: 'center' }}>Welcome to CampusCrave</div>
                    <div style={{ ...s.subtitle, textAlign: 'center' }}>
                      Claim your free order — on us, right now.
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <button
                      onClick={() => { setErrors({}); setUserType('student'); setCurrentStep('student-form'); }}
                      style={{
                        padding: '1.25rem',
                        borderRadius: '14px',
                        border: '2px solid rgba(107,33,168,0.3)',
                        background: 'rgba(107,33,168,0.06)',
                        color: '#0C0118',
                        cursor: 'pointer',
                        textAlign: 'left',
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        transition: 'border-color 150ms, background 150ms',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#6B21A8'; e.currentTarget.style.background = 'rgba(107,33,168,0.1)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(107,33,168,0.3)'; e.currentTarget.style.background = 'rgba(107,33,168,0.06)'; }}
                    >
                      <div style={{ fontWeight: 600, fontSize: '1rem', marginBottom: '4px' }}>🎓 Student</div>
                      <div style={{ fontSize: '13px', color: '#6B7280' }}>UT Tampa or local university</div>
                    </button>

                    <button
                      onClick={() => { setErrors({}); setUserType('professor'); setCurrentStep('professor-form'); }}
                      style={{
                        padding: '1.25rem',
                        borderRadius: '14px',
                        border: '2px solid rgba(107,33,168,0.3)',
                        background: 'rgba(107,33,168,0.06)',
                        color: '#0C0118',
                        cursor: 'pointer',
                        textAlign: 'left',
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        transition: 'border-color 150ms, background 150ms',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#6B21A8'; e.currentTarget.style.background = 'rgba(107,33,168,0.1)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(107,33,168,0.3)'; e.currentTarget.style.background = 'rgba(107,33,168,0.06)'; }}
                    >
                      <div style={{ fontWeight: 600, fontSize: '1rem', marginBottom: '4px' }}>👨‍🏫 Professor</div>
                      <div style={{ fontSize: '13px', color: '#6B7280' }}>Faculty at UT or neighboring institution</div>
                    </button>

                    <button
                      onClick={() => { setErrors({}); setUserType('investor'); setCurrentStep('visitor-form'); }}
                      style={{
                        padding: '1.25rem',
                        borderRadius: '14px',
                        border: '2px solid #E5E7EB',
                        background: '#F9FAFB',
                        color: '#0C0118',
                        cursor: 'pointer',
                        textAlign: 'left',
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        transition: 'border-color 150ms, background 150ms',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#D1D5DB'; e.currentTarget.style.background = '#F3F4F6'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#E5E7EB'; e.currentTarget.style.background = '#F9FAFB'; }}
                    >
                      <div style={{ fontWeight: 600, fontSize: '1rem', marginBottom: '4px' }}>👀 Possible Investor?</div>
                      <div style={{ fontSize: '13px', color: '#6B7280' }}>Judge, mentor, or expo attendee</div>
                    </button>
                  </div>

                  <div style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '12px', color: '#9CA3AF' }}>
                    🔒 No spam, ever. Just your order confirmation.
                  </div>
                </div>
              )}

              {/* ── STEP: student-form ── */}
              {currentStep === 'student-form' && (
                <div>
                  <button style={s.backBtn} onClick={() => { setErrors({}); setCurrentStep('welcome'); }}>← Back</button>
                  <div style={s.title}>You're almost in 🍗</div>
                  <div style={s.subtitle}>Quick details so we can confirm your order</div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                      <label style={s.label}>First Name</label>
                      <input
                        style={{ ...s.input, ...(errors.firstName ? s.inputError : {}) }}
                        placeholder="What do your friends call you?"
                        value={formData.firstName}
                        onChange={(e) => updateForm('firstName', e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleStudentNext()}
                      />
                      {errors.firstName && <div style={s.errorMsg}>{errors.firstName}</div>}
                    </div>
                    <div>
                      <label style={s.label}>University Email (.edu)</label>
                      <input
                        style={{ ...s.input, ...(errors.email ? s.inputError : {}) }}
                        placeholder="you@ut.edu"
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateForm('email', e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleStudentNext()}
                      />
                      {errors.email && <div style={s.errorMsg}>{errors.email}</div>}
                    </div>
                  </div>

                  <button
                    style={{ ...s.primaryBtn, marginTop: '1.5rem' }}
                    onClick={handleStudentNext}
                    onMouseEnter={(e) => (e.currentTarget.style.background = '#5B1A9F')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = '#6B21A8')}
                  >
                    Continue →
                  </button>
                </div>
              )}

              {/* ── STEP: student-questions ── */}
              {currentStep === 'student-questions' && (
                <div>
                  <button style={s.backBtn} onClick={() => setCurrentStep('student-form')}>← Back</button>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: '#0C0118', marginBottom: '4px' }}>Quick survey 📋</div>
                  <div style={{ fontSize: '12px', color: '#9CA3AF', marginBottom: '0.75rem' }}>3 questions, then your free food!</div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {studentQuestions.map(({ key, question, options }) => (
                      <div key={key}>
                        <div style={{ fontSize: '13px', color: '#0C0118', fontWeight: 600, marginBottom: '8px' }}>
                          {question}
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                          {options.map((opt) => (
                            <button
                              key={opt}
                              onClick={() => updateForm(key, opt)}
                              style={{ ...s.optionBtn(formData[key] === opt), padding: '10px 14px', fontSize: '14px', textAlign: 'center' }}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ position: 'sticky', bottom: 0, background: '#ffffff', padding: '0.75rem 0 0', marginTop: '0.75rem', borderTop: '1px solid #F3F4F6' }}>
                    {surveyError && (
                      <div style={{ ...s.errorMsg, marginBottom: '0.5rem', textAlign: 'center' }}>{surveyError}</div>
                    )}
                    <button
                      disabled={isSaving}
                      style={{
                        ...s.primaryBtn,
                        opacity: allStudentAnswered && !isSaving ? 1 : 0.45,
                        cursor: allStudentAnswered && !isSaving ? 'pointer' : 'not-allowed',
                      }}
                      onClick={allStudentAnswered && !isSaving ? handleStudentSave : undefined}
                      onMouseEnter={(e) => { if (allStudentAnswered && !isSaving) e.currentTarget.style.background = '#5B1A9F'; }}
                      onMouseLeave={(e) => (e.currentTarget.style.background = '#6B21A8')}
                    >
                      {isSaving ? 'Saving...' : 'Claim My Free Order →'}
                    </button>
                  </div>
                </div>
              )}

              {/* ── STEP: professor-form ── */}
              {currentStep === 'professor-form' && (
                <div>
                  <button style={s.backBtn} onClick={() => { setErrors({}); setCurrentStep('welcome'); }}>← Back</button>
                  <div style={s.title}>Great to meet you 👨‍🏫</div>
                  <div style={s.subtitle}>Quick details so we can confirm your order</div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                      <label style={s.label}>Full Name</label>
                      <input
                        style={{ ...s.input, ...(errors.fullName ? s.inputError : {}) }}
                        placeholder="Your full name"
                        value={formData.fullName}
                        onChange={(e) => updateForm('fullName', e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleProfessorNext()}
                      />
                      {errors.fullName && <div style={s.errorMsg}>{errors.fullName}</div>}
                    </div>
                    <div>
                      <label style={s.label}>Email</label>
                      <input
                        style={{ ...s.input, ...(errors.email ? s.inputError : {}) }}
                        placeholder="you@ut.edu"
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateForm('email', e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleProfessorNext()}
                      />
                      {errors.email && <div style={s.errorMsg}>{errors.email}</div>}
                    </div>
                  </div>

                  <button
                    style={{ ...s.primaryBtn, marginTop: '1.5rem' }}
                    onClick={handleProfessorNext}
                    onMouseEnter={(e) => (e.currentTarget.style.background = '#5B1A9F')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = '#6B21A8')}
                  >
                    Continue →
                  </button>
                </div>
              )}

              {/* ── STEP: professor-questions ── */}
              {currentStep === 'professor-questions' && (
                <div>
                  <button style={s.backBtn} onClick={() => setCurrentStep('professor-form')}>← Back</button>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: '#0C0118', marginBottom: '4px' }}>Quick survey 📋</div>
                  <div style={{ fontSize: '12px', color: '#9CA3AF', marginBottom: '0.75rem' }}>3 questions, then your free food!</div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {professorQuestions.map(({ key, question, options }) => (
                      <div key={key}>
                        <div style={{ fontSize: '13px', color: '#0C0118', fontWeight: 600, marginBottom: '8px' }}>
                          {question}
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                          {options.map((opt) => (
                            <button
                              key={opt}
                              onClick={() => updateForm(key, opt)}
                              style={{ ...s.optionBtn(formData[key] === opt), padding: '10px 14px', fontSize: '14px', textAlign: 'center' }}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ position: 'sticky', bottom: 0, background: '#ffffff', padding: '0.75rem 0 0', marginTop: '0.75rem', borderTop: '1px solid #F3F4F6' }}>
                    {surveyError && (
                      <div style={{ ...s.errorMsg, marginBottom: '0.5rem', textAlign: 'center' }}>{surveyError}</div>
                    )}
                    <button
                      disabled={isSaving}
                      style={{
                        ...s.primaryBtn,
                        opacity: allProfessorAnswered && !isSaving ? 1 : 0.45,
                        cursor: allProfessorAnswered && !isSaving ? 'pointer' : 'not-allowed',
                      }}
                      onClick={allProfessorAnswered && !isSaving ? handleProfessorSave : undefined}
                      onMouseEnter={(e) => { if (allProfessorAnswered && !isSaving) e.currentTarget.style.background = '#5B1A9F'; }}
                      onMouseLeave={(e) => (e.currentTarget.style.background = '#6B21A8')}
                    >
                      {isSaving ? 'Saving...' : 'Claim My Free Order →'}
                    </button>
                  </div>
                </div>
              )}

              {/* ── STEP: visitor-form (Possible Investor?) ── */}
              {currentStep === 'visitor-form' && (
                <div>
                  <button style={s.backBtn} onClick={() => { setErrors({}); setCurrentStep('welcome'); }}>← Back</button>
                  <div style={s.title}>Great to meet you 👀</div>
                  <div style={s.subtitle}>Tell us a bit about yourself</div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                      <label style={s.label}>Full Name</label>
                      <input
                        style={{ ...s.input, ...(errors.fullName ? s.inputError : {}) }}
                        placeholder="Your full name"
                        value={formData.fullName}
                        onChange={(e) => updateForm('fullName', e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleVisitorNext()}
                      />
                      {errors.fullName && <div style={s.errorMsg}>{errors.fullName}</div>}
                    </div>
                    <div>
                      <label style={s.label}>Email</label>
                      <input
                        style={{ ...s.input, ...(errors.email ? s.inputError : {}) }}
                        placeholder="you@company.com"
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateForm('email', e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleVisitorNext()}
                      />
                      {errors.email && <div style={s.errorMsg}>{errors.email}</div>}
                    </div>
                  </div>

                  <button
                    style={{ ...s.primaryBtn, marginTop: '1.5rem' }}
                    onClick={handleVisitorNext}
                    onMouseEnter={(e) => (e.currentTarget.style.background = '#5B1A9F')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = '#6B21A8')}
                  >
                    Continue →
                  </button>
                </div>
              )}

              {/* ── STEP: visitor-questions (Possible Investor?) ── */}
              {currentStep === 'visitor-questions' && (
                <div>
                  <button style={s.backBtn} onClick={() => setCurrentStep('visitor-form')}>← Back</button>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: '#0C0118', marginBottom: '4px' }}>3 quick questions 📋</div>
                  <div style={{ fontSize: '12px', color: '#9CA3AF', marginBottom: '0.75rem' }}>Then claim your free order</div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {visitorQuestions.map(({ key, question, options, onChange }) => (
                      <div key={key}>
                        <div style={{ fontSize: '13px', color: '#0C0118', fontWeight: 600, marginBottom: '8px' }}>
                          {question}
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                          {options.map((opt) => (
                            <button
                              key={opt}
                              onClick={() => onChange ? onChange(opt) : updateForm(key, opt)}
                              style={{ ...s.optionBtn(formData[key] === opt), padding: '10px 14px', fontSize: '14px', textAlign: 'center' }}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ position: 'sticky', bottom: 0, background: '#ffffff', padding: '0.75rem 0 0', marginTop: '0.75rem', borderTop: '1px solid #F3F4F6' }}>
                    {surveyError && (
                      <div style={{ ...s.errorMsg, marginBottom: '0.5rem', textAlign: 'center' }}>{surveyError}</div>
                    )}
                    <button
                      disabled={isSaving}
                      style={{
                        ...s.primaryBtn,
                        opacity: allVisitorAnswered && !isSaving ? 1 : 0.45,
                        cursor: allVisitorAnswered && !isSaving ? 'pointer' : 'not-allowed',
                      }}
                      onClick={allVisitorAnswered && !isSaving ? handleVisitorSave : undefined}
                      onMouseEnter={(e) => { if (allVisitorAnswered && !isSaving) e.currentTarget.style.background = '#5B1A9F'; }}
                      onMouseLeave={(e) => (e.currentTarget.style.background = '#6B21A8')}
                    >
                      {isSaving ? 'Saving...' : 'Claim My Free Order →'}
                    </button>
                  </div>
                </div>
              )}

              {/* ── STEP: ordering ── */}
              {currentStep === 'ordering' && (
                <div>
                  <button style={s.backBtn} onClick={() => setCurrentStep(backStep)}>← Back</button>
                  <div style={s.title}>Pick your order 🎉</div>
                  <div style={s.subtitle}>It's on us — choose one item</div>

                  {loadingStock ? (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1.5rem' }}>
                      {[0, 1].map((i) => (
                        <div
                          key={i}
                          style={{
                            height: '160px',
                            borderRadius: '16px',
                            background: 'rgba(255,255,255,0.06)',
                            animation: 'cc-pulse 1.5s ease-in-out infinite',
                          }}
                        />
                      ))}
                    </div>
                  ) : allSoldOut ? (
                    <div style={{ textAlign: 'center', paddingTop: '1rem' }}>
                      <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🚀</div>
                      <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0C0118', marginBottom: '0.5rem' }}>
                        We sold out!
                      </div>
                      <div style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '1.5rem', lineHeight: 1.5 }}>
                        Drop your email to be first when we officially launch.
                      </div>
                      <input
                        style={{ ...s.input, marginBottom: '0.75rem', textAlign: 'center' }}
                        type="email"
                        placeholder="your@email.com"
                        value={waitlistEmail}
                        onChange={(e) => setWaitlistEmail(e.target.value)}
                      />
                      {waitlistDone ? (
                        <div style={{ color: '#4ADE80', fontWeight: 600, fontSize: '0.9rem' }}>✓ You're on the list!</div>
                      ) : (
                        <button
                          style={s.primaryBtn}
                          onClick={() => {
                            if (!waitlistEmail) return;
                            try {
                              const existing = JSON.parse(localStorage.getItem('cc_waitlist') || '[]');
                              if (!existing.includes(waitlistEmail)) {
                                localStorage.setItem('cc_waitlist', JSON.stringify([...existing, waitlistEmail]));
                              }
                            } catch (_e) { /* ignore */ }
                            if (window.__db && typeof window.__db.createLead === 'function') {
                              window.__db.createLead({ type: 'waitlist', firstName: 'Waitlist', email: waitlistEmail })
                                .catch((_e) => { /* fallback already saved to localStorage */ });
                            }
                            setWaitlistDone(true);
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = '#5B1A9F')}
                          onMouseLeave={(e) => (e.currentTarget.style.background = '#6B21A8')}
                        >
                          Notify Me
                        </button>
                      )}
                    </div>
                  ) : (
                    <>
                      {orderError === 'sold_out' && (
                        <div style={{
                          background: 'rgba(239,68,68,0.1)',
                          border: '1px solid rgba(239,68,68,0.3)',
                          borderRadius: '8px',
                          padding: '0.75rem 1rem',
                          marginBottom: '1rem',
                          fontSize: '13px',
                          color: '#DC2626',
                        }}>
                          Sorry, that item just sold out. Please choose another.
                        </div>
                      )}

                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                        gap: '1rem',
                        marginTop: '1.5rem',
                      }}>
                        {FOOD_ITEMS.map((item) => (
                          <FoodItem
                            key={item.id}
                            item={item}
                            selected={selectedItem ? selectedItem.id === item.id : false}
                            onSelect={setSelectedItem}
                            soldOut={getSoldOut(item.name)}
                          />
                        ))}
                      </div>

                      <button
                        style={{
                          ...s.primaryBtn,
                          marginTop: '1.5rem',
                          opacity: selectedItem ? 1 : 0.45,
                          cursor: selectedItem ? 'pointer' : 'not-allowed',
                        }}
                        onClick={() => { if (selectedItem) setCurrentStep('swipe'); }}
                        onMouseEnter={(e) => { if (selectedItem) e.currentTarget.style.background = '#5B1A9F'; }}
                        onMouseLeave={(e) => (e.currentTarget.style.background = '#6B21A8')}
                      >
                        Place My Order →
                      </button>
                    </>
                  )}
                </div>
              )}

              {/* ── STEP: swipe ── */}
              {currentStep === 'swipe' && (
                <div>
                  <button style={s.backBtn} onClick={() => setCurrentStep('ordering')}>← Back</button>
                  <div style={{ ...s.title, textAlign: 'center' }}>Almost there!</div>
                  <div style={{ ...s.subtitle, textAlign: 'center' }}>Slide to confirm your free order</div>

                  {/* Order summary card */}
                  <div style={{
                    background: '#F9FAFB',
                    border: '1px solid #E5E7EB',
                    borderRadius: '16px',
                    padding: '1rem 1.25rem',
                    marginBottom: '1.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span style={{ fontSize: '2rem' }}>{selectedItem ? selectedItem.emoji : ''}</span>
                      <div>
                        <div style={{ color: '#0C0118', fontWeight: 600, fontSize: '0.95rem' }}>
                          {selectedItem ? selectedItem.name : ''}
                        </div>
                        <div style={{ color: '#6B7280', fontSize: '12px', marginTop: '2px' }}>
                          {selectedItem ? selectedItem.restaurant : ''}
                        </div>
                      </div>
                    </div>
                    <span style={{
                      background: 'rgba(34,197,94,0.15)',
                      color: '#4ADE80',
                      borderRadius: '8px',
                      padding: '4px 12px',
                      fontSize: '13px',
                      fontWeight: 600,
                    }}>
                      FREE
                    </span>
                  </div>

                  <SwipeButton
                    key={swipeKey}
                    label="Slide to place your order →"
                    onSuccess={handleSwipeSuccess}
                    disabled={swipeLoading}
                  />

                  {swipeErrMsg && (
                    <div style={{ textAlign: 'center', marginTop: '0.75rem', fontSize: '13px', color: '#F87171' }}>
                      {swipeErrMsg}
                    </div>
                  )}
                </div>
              )}

            </div>
          )}

          {/* ── STEP: already-ordered ── */}
          {currentStep === 'already-ordered' && (
            <div style={{ textAlign: 'center', padding: '40px 24px' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>👀</div>
              <h2 style={{
                fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '22px',
                color: '#0C0118', marginBottom: '8px',
              }}>
                You already have an order!
              </h2>
              <p style={{
                color: '#6B7280', fontSize: '14px',
                fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: '24px',
                lineHeight: 1.5,
              }}>
                One order per person — show your confirmation screen
                at the booth to pick up your food.
              </p>
              <button
                onClick={onClose}
                style={{
                  background: '#6B21A8', color: 'white', border: 'none',
                  borderRadius: '12px', padding: '12px 32px',
                  fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600,
                  fontSize: '15px', cursor: 'pointer',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#5B1A9F')}
                onMouseLeave={(e) => (e.currentTarget.style.background = '#6B21A8')}
              >
                Got it ✓
              </button>
            </div>
          )}

          {/* ── STEP: confirmation ── */}
          {currentStep === 'confirmation' && (
            <div style={{ padding: 0, overflow: 'hidden' }}>
              <OrderConfirmation
                firstName={firstName}
                orderNumber={orderNumber}
                itemName={selectedItem ? selectedItem.name : ''}
                restaurant={selectedItem ? selectedItem.restaurant : ''}
                onDone={() => {
                  if (onOrderComplete) onOrderComplete();
                  onClose();
                }}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
