import React, { useState, useEffect, useRef } from 'react';
import {
  MessageCircle,
  Menu,
  X,
  Sparkles,
  Check,
  FlaskConical,
  ArrowRight,
  Sparkle,
  ShieldCheck,
  Heart,
  Smile,
  Activity,
  ChevronRight,
  Info,
  SquareActivity,
  ChevronsUpDown,
  ChevronLeft,
  Award,
  MapPin,
  Phone,
  Instagram,
  Navigation,
  Send,
  Star,
  ChevronDown
} from 'lucide-react';

// --- Static Data Definitions ---
const scheduleDataset = {
  mon: [
    { time: "07:00 AM", name: "Aerial Foundations", level: "Beginner-Friendly", category: "beginner" },
    { time: "09:00 AM", name: "Therapeutic Decompression", level: "All Levels", category: "restorative" },
    { time: "06:00 PM", name: "Aerial Flow Sequences", level: "Intermediate", category: "flow" }
  ],
  tue: [
    { time: "07:00 AM", name: "Aerial Foundations", level: "Beginner-Friendly", category: "beginner" },
    { time: "05:00 PM", name: "Kids Aerial Program", level: "Ages 7-14", category: "beginner" },
    { time: "06:00 PM", name: "Therapeutic Gentle Stretch", level: "Restorative Focus", category: "restorative" }
  ],
  wed: [
    { time: "07:00 AM", name: "Aerial Flow Sequences", level: "Intermediate", category: "flow" },
    { time: "09:00 AM", name: "Aerial Foundations", level: "Beginner-Friendly", category: "beginner" },
    { time: "06:00 PM", name: "Aerial Flow Sequences", level: "Intermediate", category: "flow" }
  ],
  thu: [
    { time: "07:00 AM", name: "Aerial Foundations", level: "Beginner-Friendly", category: "beginner" },
    { time: "05:00 PM", name: "Kids Aerial Program", level: "Ages 7-14", category: "beginner" },
    { time: "06:00 PM", name: "Therapeutic Gentle Stretch", level: "Restorative Focus", category: "restorative" }
  ],
  fri: [
    { time: "07:00 AM", name: "Aerial Foundations", level: "Beginner-Friendly", category: "beginner" },
    { time: "09:00 AM", name: "Therapeutic Decompression", level: "All Levels", category: "restorative" },
    { time: "06:00 PM", name: "Aerial Flow Sequences", level: "Intermediate", category: "flow" }
  ],
  sat: [
    { time: "08:00 AM", name: "Introductory Special Session", level: "First-time Trial Only", category: "beginner" },
    { time: "10:00 AM", name: "Teacher Training Core", level: "Registered Trainees Only", category: "flow" }
  ]
};

const testimonialsData = [
  {
    stars: 5,
    title: "Relief from chronic posture tension",
    quote: "Long sitting hours left my back consistently stiff. Hanging traction poses decompressed my lumbar region and helped ease the tension after just 5 sessions.",
    user: "Meera S. — Surat Resident",
    duration: "Practicing 6 Months"
  },
  {
    stars: 5,
    title: "Safety standard is outstanding",
    quote: "I felt anxious about inversions. Disha's step-by-step guidance, supportive spot setups, and professional focus made me feel completely secure.",
    user: "Pooja Patel — Surat Resident",
    duration: "Practicing 3 Months"
  },
  {
    stars: 5,
    title: "Incredible for core development",
    quote: "Traditional exercises strained my back. Practicing suspended core routines has safely strengthened my stability muscles without joint compression.",
    user: "Anjali K. — Surat Resident",
    duration: "Practicing 8 Months"
  }
];

const galleryDataset = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80",
    caption: "Supported Inversion Practice",
    tag: "silks",
    tagName: "Silks & Inversions",
    shapeClass: "rounded-[6rem_2rem_5rem_3rem] rotate-1 h-[320px] sm:h-[380px]"
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=800&q=80",
    caption: "Sound Bath & Meditation Room",
    tag: "sound",
    tagName: "Sound & Meditation",
    shapeClass: "rounded-[3rem_5rem_2rem_6rem] -rotate-1.5 h-[340px] sm:h-[420px]"
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=800&q=80",
    caption: "Supported Alignment Stretch",
    tag: "silks",
    tagName: "Silks & Inversions",
    shapeClass: "rounded-[5rem_3rem_6rem_2rem] rotate-1.5 h-[320px] sm:h-[360px]"
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80",
    caption: "Boutique Studio Architecture",
    tag: "interior",
    tagName: "Boutique Interior",
    shapeClass: "rounded-[2rem_6rem_3rem_5rem] -rotate-1 h-[340px] sm:h-[400px]"
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80",
    caption: "Core Stability Dynamic Session",
    tag: "silks",
    tagName: "Silks & Inversions",
    shapeClass: "rounded-[4rem_2rem_5rem_3rem] rotate-1 h-[320px] sm:h-[370px]"
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&w=800&q=80",
    caption: "Mindful Serenity & Savasana",
    tag: "sound",
    tagName: "Sound & Meditation",
    shapeClass: "rounded-[6rem_3rem_4rem_5rem] -rotate-1 h-[330px] sm:h-[410px]"
  }
];

export default function App() {
  // --- UI Interactivity States ---
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeAnatomySpot, setActiveAnatomySpot] = useState('spot-cervical');
  const [activeTimetableDay, setActiveTimetableDay] = useState('mon');
  const [activeTimetableFilter, setActiveTimetableFilter] = useState('all');
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [activeGalleryCategory, setActiveGalleryCategory] = useState('all');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState(null);
  const [activeFacilityTab, setActiveFacilityTab] = useState('tab-rigging');
  
  // --- Membership Customizer States ---
  const [frequency, setFrequency] = useState('trial');
  const [addSoundBath, setAddSoundBath] = useState(false);
  const [addConsultation, setAddConsultation] = useState(false);

  // --- Modals and Forms States ---
  const [bookingModalPreset, setBookingModalPreset] = useState(null);
  const [formStatus, setFormStatus] = useState(null);
  const [modalStatus, setModalStatus] = useState(null);

  // --- Accessibility Reference Tracking ---
  const lastFocusedElement = useRef(null);

  // --- Accordion Open States (IDs of active accordion panels) ---
  const [openAccordions, setOpenAccordions] = useState({});

  const toggleAccordion = (index) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // --- Trust Stats Counter Logic ---
  const [statsAnimated, setStatsAnimated] = useState(false);
  const [yearsCounter, setYearsCounter] = useState(0);
  const [studentsCounter, setStudentsCounter] = useState(0);
  const [hoursCounter, setHoursCounter] = useState(0);
  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
          setStatsAnimated(true);
          animateCounter(7, setYearsCounter);
          animateCounter(250, setStudentsCounter);
          animateCounter(500, setHoursCounter);
        }
      });
    }, { threshold: 0.4 });

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }
    return () => observer.disconnect();
  }, [statsAnimated]);

  const animateCounter = (target, setter) => {
    const duration = 1400;
    const startTime = performance.now();
    function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setter(Math.floor(eased * target));
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setter(target);
      }
    }
    requestAnimationFrame(tick);
  };

  // --- Gentle Scroll Reveal ---
  useEffect(() => {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    document.querySelectorAll('.reveal-on-scroll').forEach(el => revealObserver.observe(el));
    return () => revealObserver.disconnect();
  }, []);

  // --- Global Escape Key Listener ---
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key !== 'Escape') return;
      if (activeLightboxIndex !== null) {
        closeLightbox();
      } else if (bookingModalPreset !== null) {
        closeBookingModal();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxIndex, bookingModalPreset]);

  // --- Modal Helpers ---
  const openBookingModal = (className) => {
    lastFocusedElement.current = document.activeElement;
    setBookingModalPreset(className);
    document.body.style.overflow = "hidden";
  };

  const closeBookingModal = () => {
    setBookingModalPreset(null);
    setModalStatus(null);
    document.body.style.overflow = "auto";
    if (lastFocusedElement.current) {
      lastFocusedElement.current.focus();
    }
  };

  const openLightbox = (index) => {
    lastFocusedElement.current = document.activeElement;
    setActiveLightboxIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setActiveLightboxIndex(null);
    document.body.style.overflow = "auto";
    if (lastFocusedElement.current) {
      lastFocusedElement.current.focus();
    }
  };

  const navigateLightbox = (direction) => {
    const filtered = getFilteredGallery();
    const size = filtered.length;
    if (size === 0) return;
    setActiveLightboxIndex((prev) => (prev + direction + size) % size);
  };

  // --- Membership Calculation Logic ---
  const getCalculatedPrice = () => {
    let baseFee = 499;
    let unitText = "/ Session";
    let descText = "Perfect introduction to the studio experience. Includes secure rigging setup and basic balance practices.";

    if (frequency === 'monthly') {
      baseFee = 3999;
      unitText = "/ Month";
      descText = "Our standard monthly pass (8 classes). Designed to help you build physical consistency and flexibility.";
    } else if (frequency === 'unlimited') {
      baseFee = 6999;
      unitText = "/ Month";
      descText = "Complete, unlimited access to all weekly classes, along with priority booking reservations.";
    }

    if (addSoundBath) baseFee += 499;
    if (addConsultation) baseFee += 999;

    return {
      price: "₹" + baseFee.toLocaleString('en-IN'),
      unit: unitText,
      desc: descText,
      totalFee: baseFee
    };
  };

  const calculatedInfo = getCalculatedPrice();

  // --- Filtered Datasets ---
  const getFilteredTimetable = () => {
    const rows = scheduleDataset[activeTimetableDay] || [];
    if (activeTimetableFilter === 'all') return rows;
    return rows.filter(item => item.category === activeTimetableFilter);
  };

  const getFilteredGallery = () => {
    if (activeGalleryCategory === 'all') return galleryDataset;
    return galleryDataset.filter(item => item.tag === activeGalleryCategory);
  };

  // --- Form Handlers ---
  const handleInquirySubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    setFormStatus({ type: 'info', text: 'Processing details...' });
    setTimeout(() => {
      setFormStatus({ type: 'success', text: 'Inquiry sent successfully. A coordinator will text you back on WhatsApp shortly.' });
      form.reset();
    }, 1000);
  };

  const handleModalReservationSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    setModalStatus({ type: 'info', text: 'Verifying slot availability...' });
    setTimeout(() => {
      setModalStatus({ type: 'success', text: 'Reservation Received. Check your WhatsApp for confirmation.' });
      setTimeout(() => {
        closeBookingModal();
        form.reset();
      }, 1800);
    }, 1200);
  };

  return (
    <div className="antialiased overflow-x-hidden">
      <a href="#main-content" className="skip-link">Skip to main content</a>

      {/* Header & Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-brand-surface/80 backdrop-blur-md border-b border-brand-secondary-light/40 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand Identity */}
            <a href="#" className="flex flex-col whitespace-nowrap shrink-0">
              <span className="luxury-serif text-2xl font-bold tracking-wider text-brand-primary leading-tight">THE WAVES</span>
              <span className="text-[10px] tracking-[0.25em] text-brand-accent uppercase font-bold">Aerial Yoga Studio</span>
            </a>

            {/* Desktop Navigation Menu */}
            <nav className="hidden lg:flex items-center lg:space-x-3 xl:space-x-6 lg:ml-4 xl:ml-8">
              <a href="#evidence" className="lg:text-[10px] xl:text-xs uppercase lg:tracking-wider xl:tracking-widest font-semibold text-brand-text hover:text-brand-primary transition-colors whitespace-nowrap">Research</a>
              <a href="#method" className="lg:text-[10px] xl:text-xs uppercase lg:tracking-wider xl:tracking-widest font-semibold text-brand-text hover:text-brand-primary transition-colors whitespace-nowrap">Our Method</a>
              <a href="#programs" className="lg:text-[10px] xl:text-xs uppercase lg:tracking-wider xl:tracking-widest font-semibold text-brand-text hover:text-brand-primary transition-colors whitespace-nowrap">Programs</a>
              <a href="#gallery" className="lg:text-[10px] xl:text-xs uppercase lg:tracking-wider xl:tracking-widest font-semibold text-brand-text hover:text-brand-primary transition-colors whitespace-nowrap">Gallery</a>
              <a href="#facilities" className="lg:text-[10px] xl:text-xs uppercase lg:tracking-wider xl:tracking-widest font-semibold text-brand-text hover:text-brand-primary transition-colors whitespace-nowrap">Facilities</a>
              <a href="#pricing" className="lg:text-[10px] xl:text-xs uppercase lg:tracking-wider xl:tracking-widest font-semibold text-brand-text hover:text-brand-primary transition-colors whitespace-nowrap">Memberships</a>
            </nav>

            {/* Action Button Block */}
            <div className="hidden lg:flex items-center space-x-4">
              <a href="https://wa.me/918733888476" target="_blank" rel="noopener noreferrer"
                className="text-brand-primary hover:text-brand-silk p-2 transition-transform hover:scale-105"
                title="WhatsApp Inquiry" aria-label="Contact us on WhatsApp">
                <MessageCircle className="w-6 h-6" />
              </a>
              <button onClick={() => openBookingModal('Trial Class Reservation')}
                className="bg-brand-primary hover:bg-brand-primary-dark text-white px-6 py-2.5 rounded-full text-xs uppercase tracking-widest font-bold transition-all duration-200 shadow-sm border border-transparent hover:shadow-[0_0_15px_rgba(74,42,103,0.3)] whitespace-nowrap">
                Book Trial Class
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center space-x-2">
              <button onClick={() => openBookingModal('Trial Class Reservation')}
                className="bg-brand-primary text-white px-4 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold">
                Book Trial
              </button>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-brand-primary focus:outline-none p-2 rounded-lg"
                aria-expanded={mobileMenuOpen} aria-controls="mobile-menu" aria-label="Toggle navigation menu">
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div id="mobile-menu" className={`${mobileMenuOpen ? 'block' : 'hidden'} lg:hidden bg-brand-surface border-b border-brand-secondary-light px-4 pt-2 pb-6 space-y-3 shadow-lg`}>
          <a href="#evidence" onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-md text-sm uppercase tracking-wider font-semibold text-brand-text hover:bg-brand-background transition-colors">Research</a>
          <a href="#method" onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-md text-sm uppercase tracking-wider font-semibold text-brand-text hover:bg-brand-background transition-colors">Our Method</a>
          <a href="#programs" onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-md text-sm uppercase tracking-wider font-semibold text-brand-text hover:bg-brand-background transition-colors">Programs</a>
          <a href="#gallery" onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-md text-sm uppercase tracking-wider font-semibold text-brand-text hover:bg-brand-background transition-colors">Gallery</a>
          <a href="#facilities" onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-md text-sm uppercase tracking-wider font-semibold text-brand-text hover:bg-brand-background transition-colors">Facilities</a>
          <a href="#pricing" onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-md text-sm uppercase tracking-wider font-semibold text-brand-text hover:bg-brand-background transition-colors">Memberships</a>
          <div className="pt-4 flex flex-col space-y-3 border-t border-brand-secondary-light">
            <a href="https://wa.me/918733888476" target="_blank" rel="noopener noreferrer"
              className="w-full text-center border border-brand-accent text-brand-accent hover:bg-brand-background py-3 rounded-full text-xs uppercase tracking-widest font-bold transition-all flex items-center justify-center gap-2">
              <MessageCircle className="w-4 h-4" /> WhatsApp Studio
            </a>
          </div>
        </div>
      </header>

      {/* Page body — offset by fixed header height */}
      <div className="pt-20">

      {/* Hero Banner Section */}
      <section id="main-content" className="relative w-full">
        {/* Desktop Banner — hidden on mobile */}
        <div className="w-full overflow-hidden hidden sm:block">
          <img src="/banner.png" alt="Sanctuary Banner" className="w-full h-auto block" style={{ marginTop: '-5%' }} />
        </div>
        {/* Mobile Banner — visible only on mobile */}
        <div className="w-full overflow-hidden block sm:hidden">
          <img src="/banner-mobile.png" alt="Sanctuary Banner Mobile" className="w-full h-auto block" />
        </div>

        {/* Overlaid Buttons — hidden on mobile, visible on desktop */}
        <div className="absolute inset-x-0 bottom-6 sm:bottom-24 z-10 hidden sm:flex items-center justify-center sm:justify-end sm:pr-16">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4">
            <button onClick={() => openBookingModal('Trial Class Reservation')}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-brand-primary hover:bg-brand-primary-dark text-white rounded-full text-[10px] sm:text-xs uppercase tracking-widest font-bold transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(74,42,103,0.5)] whitespace-nowrap">
              Book Trial Class — ₹499
            </button>
            <a href="https://wa.me/918733888476" target="_blank" rel="noopener noreferrer"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-white/90 backdrop-blur-sm border border-brand-accent/60 hover:bg-white text-brand-primary text-[10px] sm:text-xs uppercase tracking-widest font-bold rounded-full transition-all duration-200 flex items-center justify-center gap-2 shadow-sm whitespace-nowrap">
              <MessageCircle className="w-4 h-4 text-green-600" /> WhatsApp Now
            </a>
          </div>
        </div>
      </section>

      {/* Trust Stats Strip */}
      <section ref={statsRef} className="bg-brand-primary py-8 sm:py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-4 text-center">
            <div className="stat-counter-box">
              <span className="luxury-serif text-3xl sm:text-4xl font-bold text-white block">
                <span>{yearsCounter}</span>+
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-widest text-brand-secondary-light/80 font-bold mt-1 block">Years Teaching</span>
            </div>
            <div className="stat-counter-box">
              <span className="luxury-serif text-3xl sm:text-4xl font-bold text-white block">
                <span>{studentsCounter}</span>+
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-widest text-brand-secondary-light/80 font-bold mt-1 block">Students Trained</span>
            </div>
            <div className="stat-counter-box">
              <span className="luxury-serif text-3xl sm:text-4xl font-bold text-white block">
                <span>{hoursCounter}</span>+
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-widest text-brand-secondary-light/80 font-bold mt-1 block">Hrs Certified Training</span>
            </div>
            <div className="stat-counter-box">
              <span className="luxury-serif text-3xl sm:text-4xl font-bold text-white block">4.9★</span>
              <span className="text-[10px] sm:text-xs uppercase tracking-widest text-brand-secondary-light/80 font-bold mt-1 block">Average Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Divider */}
      <div className="text-center py-4 bg-brand-surface text-brand-accent tracking-[0.4em] text-xs">◆ ❖ ◆</div>

      {/* Why Aerial Yoga Section */}
      <section id="why-aerial" className="py-24 bg-brand-surface reveal-on-scroll">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.25em] text-brand-accent font-bold">The Science of Suspension</span>
            <h2 className="luxury-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-primary mt-3 leading-tight">Why Choose Suspension Practice?</h2>
            <p className="text-brand-muted mt-5 text-sm sm:text-base leading-relaxed font-light">Working with an aerial hammock allows you to experience deep alignments, restorative physical decompression, and supportive core development.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            <div className="bg-brand-background p-8 rounded-2xl border border-brand-secondary-light/50 hover:border-brand-accent/50 hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
              <div className="space-y-5">
                <div className="w-12 h-12 rounded-xl bg-brand-secondary-light/60 flex items-center justify-center text-brand-primary">
                  <Sparkles className="w-5 h-5 text-brand-accent" />
                </div>
                <h3 className="font-bold text-base uppercase tracking-wider text-brand-primary">Improves Flexibility</h3>
                <p className="text-brand-muted text-xs leading-relaxed font-light">Decompress joints and stretch tissues deeper with physical suspension support.</p>
              </div>
            </div>

            <div className="bg-brand-background p-8 rounded-2xl border border-brand-secondary-light/50 hover:border-brand-accent/50 hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
              <div className="space-y-5">
                <div className="w-12 h-12 rounded-xl bg-brand-secondary-light/60 flex items-center justify-center text-brand-primary">
                  <ShieldCheck className="w-5 h-5 text-brand-accent" />
                </div>
                <h3 className="font-bold text-base uppercase tracking-wider text-brand-primary">Builds Core</h3>
                <p className="text-brand-muted text-xs leading-relaxed font-light">Engage your deep core muscles naturally as you find balance suspended above ground.</p>
              </div>
            </div>

            <div className="bg-brand-background p-8 rounded-2xl border border-brand-secondary-light/50 hover:border-brand-accent/50 hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
              <div className="space-y-5">
                <div className="w-12 h-12 rounded-xl bg-brand-secondary-light/60 flex items-center justify-center text-brand-primary">
                  <Heart className="w-5 h-5 text-brand-accent" />
                </div>
                <h3 className="font-bold text-base uppercase tracking-wider text-brand-primary">Relieves Stress</h3>
                <p className="text-brand-muted text-xs leading-relaxed font-light">Gentle traction on the spine helps calm and soothe the nervous system.</p>
              </div>
            </div>

            <div className="bg-brand-background p-8 rounded-2xl border border-brand-secondary-light/50 hover:border-brand-accent/50 hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
              <div className="space-y-5">
                <div className="w-12 h-12 rounded-xl bg-brand-secondary-light/60 flex items-center justify-center text-brand-primary">
                  <Smile className="w-5 h-5 text-brand-accent" />
                </div>
                <h3 className="font-bold text-base uppercase tracking-wider text-brand-primary">Beginner Safe</h3>
                <p className="text-brand-muted text-xs leading-relaxed font-light">Our classes are fully adjustable, making the practice approachable for beginners.</p>
              </div>
            </div>

            <div className="bg-brand-background p-8 rounded-2xl border border-brand-secondary-light/50 hover:border-brand-accent/50 hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
              <div className="space-y-5">
                <div className="w-12 h-12 rounded-xl bg-brand-secondary-light/60 flex items-center justify-center text-brand-primary">
                  <Activity className="w-5 h-5 text-brand-accent" />
                </div>
                <h3 className="font-bold text-base uppercase tracking-wider text-brand-primary">Supports Posture</h3>
                <p className="text-brand-muted text-xs leading-relaxed font-light">Counteract daily sitting strain by expanding and lengthening tight vertebrae.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Evidence & Research Backing */}
      <section id="evidence" className="py-24 bg-brand-background relative overflow-hidden reveal-on-scroll">
        <div className="absolute inset-0 z-0 opacity-25 pointer-events-none bg-[radial-gradient(#C8A05A_1px,transparent_1px)] [background-size:20px_20px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-[0.25em] text-brand-accent font-bold">Backed by Research</span>
            <h2 className="luxury-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-primary mt-3 leading-tight">Not Just a Trend — Tested by Science</h2>
            <p className="text-brand-muted mt-5 text-sm sm:text-base leading-relaxed font-light">Suspension practice has been studied by exercise physiologists and yoga researchers alike. Here is what published research says about aerial yoga's effect on the body.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
            <div className="bg-brand-surface rounded-2xl p-7 border border-brand-secondary-light/60 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <span className="luxury-serif text-4xl font-bold text-brand-primary block">320</span>
              <span className="text-[11px] uppercase tracking-widest text-brand-accent font-bold block mt-1">Calories / 50-Min Class</span>
              <p className="text-brand-muted text-xs leading-relaxed font-light mt-3">An ACE-commissioned study found a single aerial session burns calories at a rate comparable to brisk walking or light cycling.</p>
            </div>
            <div className="bg-brand-surface rounded-2xl p-7 border border-brand-secondary-light/60 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <span className="luxury-serif text-4xl font-bold text-brand-primary block">2–3mm</span>
              <span className="text-[11px] uppercase tracking-widest text-brand-accent font-bold block mt-1">Disc Height Gained</span>
              <p className="text-brand-muted text-xs leading-relaxed font-light mt-3">Spine research links supported inversion traction to a temporary increase in space between vertebrae, easing pressure on compressed nerves.</p>
            </div>
            <div className="bg-brand-surface rounded-2xl p-7 border border-brand-secondary-light/60 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <span className="luxury-serif text-4xl font-bold text-brand-primary block">8 Weeks</span>
              <span className="text-[11px] uppercase tracking-widest text-brand-accent font-bold block mt-1">To Measurable Change</span>
              <p className="text-brand-muted text-xs leading-relaxed font-light mt-3">Yoga journal research recorded improved spinal flexibility and lower perceived stress in participants after eight weeks of regular practice.</p>
            </div>
            <div className="bg-brand-surface rounded-2xl p-7 border border-brand-secondary-light/60 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <span className="luxury-serif text-4xl font-bold text-brand-primary block">6 Weeks</span>
              <span className="text-[11px] uppercase tracking-widest text-brand-accent font-bold block mt-1">Heart-Health Gains</span>
              <p className="text-brand-muted text-xs leading-relaxed font-light mt-3">A six-week aerial yoga intervention was shown to lower several cardiovascular risk markers, including resting heart rate and body-fat percentage.</p>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="bg-brand-surface rounded-3xl border border-brand-secondary-light/70 shadow-md overflow-hidden max-w-4xl mx-auto">
            <div className="grid grid-cols-3 bg-brand-primary text-white text-[10px] sm:text-xs uppercase tracking-widest font-bold">
              <div className="p-4 sm:p-5">Focus Area</div>
              <div className="p-4 sm:p-5 text-center border-l border-white/10">Mat Yoga</div>
              <div className="p-4 sm:p-5 text-center border-l border-white/10 bg-brand-primary-dark">Aerial Yoga</div>
            </div>
            <div className="divide-y divide-brand-secondary-light/50 text-xs sm:text-sm">
              <div className="grid grid-cols-3 items-center">
                <div className="p-4 sm:p-5 font-semibold text-brand-text">Joint Loading</div>
                <div className="p-4 sm:p-5 text-center text-brand-muted border-l border-brand-secondary-light/50">Full body weight on joints</div>
                <div className="p-4 sm:p-5 text-center text-brand-primary font-medium border-l border-brand-secondary-light/50 bg-brand-secondary-light/10">Hammock-supported, reduced compression</div>
              </div>
              <div className="grid grid-cols-3 items-center">
                <div className="p-4 sm:p-5 font-semibold text-brand-text">Spinal Traction</div>
                <div className="p-4 sm:p-5 text-center text-brand-muted border-l border-brand-secondary-light/50">Limited to forward folds</div>
                <div className="p-4 sm:p-5 text-center text-brand-primary font-medium border-l border-brand-secondary-light/50 bg-brand-secondary-light/10">True gravity-assisted decompression</div>
              </div>
              <div className="grid grid-cols-3 items-center">
                <div className="p-4 sm:p-5 font-semibold text-brand-text">Core Engagement</div>
                <div className="p-4 sm:p-5 text-center text-brand-muted border-l border-brand-secondary-light/50">Static holds</div>
                <div className="p-4 sm:p-5 text-center text-brand-primary font-medium border-l border-brand-secondary-light/50 bg-brand-secondary-light/10">Constant micro-stabilization in fabric</div>
              </div>
              <div className="grid grid-cols-3 items-center">
                <div className="p-4 sm:p-5 font-semibold text-brand-text">Beginner Accessibility</div>
                <div className="p-4 sm:p-5 text-center text-brand-muted border-l border-brand-secondary-light/50">High</div>
                <div className="p-4 sm:p-5 text-center text-brand-primary font-medium border-l border-brand-secondary-light/50 bg-brand-secondary-light/10">High, with adjustable hammock height</div>
              </div>
            </div>
          </div>

          <p className="text-center text-brand-muted text-[10px] sm:text-xs font-light mt-6 max-w-2xl mx-auto">
            Figures summarize published aerial yoga and exercise-science research; individual results vary by body and consistency of practice. Always consult a physician before starting a new fitness routine, especially if pregnant or managing a cardiovascular or spinal condition.
          </p>
        </div>
      </section>

      {/* Interactive Anatomy & Decompression Spotlight Map */}
      <section id="decompression" className="py-24 bg-brand-background relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] text-brand-accent font-bold">Physical Decompression Map</span>
                <h2 className="luxury-serif text-3xl sm:text-4xl font-bold text-brand-primary mt-3 leading-tight">Focus Areas</h2>
                <p className="text-brand-muted text-sm sm:text-base mt-4 font-light">
                  Suspended traction gently opens up tight physical structures. Select a focus area to see how aerial yoga supports that muscle group.
                </p>
              </div>

              {/* Clickable Interactive Selector Group */}
              <div className="space-y-3 pt-4">
                <button onClick={() => setActiveAnatomySpot('spot-cervical')}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between ${
                    activeAnatomySpot === 'spot-cervical' 
                      ? 'border-brand-accent bg-brand-surface shadow-sm' 
                      : 'border-brand-secondary-light bg-brand-surface hover:bg-brand-secondary-light/20'
                  }`}>
                  <div className="flex items-center gap-3">
                    <span className={`w-2 h-2 rounded-full shrink-0 ${activeAnatomySpot === 'spot-cervical' ? 'bg-brand-accent' : 'bg-brand-secondary'}`}></span>
                    <span className="font-bold text-brand-primary text-sm uppercase tracking-wider">Cervical Spine & Neck</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-brand-accent" />
                </button>

                <button onClick={() => setActiveAnatomySpot('spot-lumbar')}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between ${
                    activeAnatomySpot === 'spot-lumbar' 
                      ? 'border-brand-accent bg-brand-surface shadow-sm' 
                      : 'border-brand-secondary-light bg-brand-surface hover:bg-brand-secondary-light/20'
                  }`}>
                  <div className="flex items-center gap-3">
                    <span className={`w-2 h-2 rounded-full shrink-0 ${activeAnatomySpot === 'spot-lumbar' ? 'bg-brand-accent' : 'bg-brand-secondary'}`}></span>
                    <span className="font-bold text-brand-primary text-sm uppercase tracking-wider">Lower Lumbar Region</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-brand-accent" />
                </button>

                <button onClick={() => setActiveAnatomySpot('spot-core')}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between ${
                    activeAnatomySpot === 'spot-core' 
                      ? 'border-brand-accent bg-brand-surface shadow-sm' 
                      : 'border-brand-secondary-light bg-brand-surface hover:bg-brand-secondary-light/20'
                  }`}>
                  <div className="flex items-center gap-3">
                    <span className={`w-2 h-2 rounded-full shrink-0 ${activeAnatomySpot === 'spot-core' ? 'bg-brand-accent' : 'bg-brand-secondary'}`}></span>
                    <span className="font-bold text-brand-primary text-sm uppercase tracking-wider">Core & Pelvic Girdle</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-brand-accent" />
                </button>
              </div>
            </div>

            {/* Right Content Area */}
            <div className="lg:col-span-7 relative flex justify-center items-center">
              <div className="absolute inset-0 z-0 bg-[radial-gradient(#C8A05A_1px,transparent_1px)] [background-size:16px_16px] opacity-20"></div>

              <div className="relative z-10 w-full max-w-lg bg-brand-surface rounded-3xl p-8 border border-brand-secondary-light/60 shadow-xl overflow-hidden aspect-[4/3] flex flex-col justify-between">
                <div className="flex justify-between items-center border-b border-brand-secondary-light/40 pb-4">
                  <span className="text-[10px] uppercase font-bold text-brand-accent tracking-widest">Active Analysis</span>
                  <span className="text-[10px] uppercase font-bold text-brand-primary bg-brand-secondary-light/60 px-3 py-1 rounded-full">Decompression Therapy</span>
                </div>

                <div className="py-6 space-y-4">
                  {activeAnatomySpot === 'spot-cervical' && (
                    <div className="space-y-4">
                      <h3 className="luxury-serif text-2xl font-bold text-brand-primary">Cervical Spine Decompression</h3>
                      <p className="text-brand-muted text-sm leading-relaxed font-light">
                        Supported inversions gently traction the neck and shoulders. This pressure-free hanging alignment helps relieve tension in the upper vertebrae and muscles.
                      </p>
                      <div className="inline-flex items-center gap-2 text-xs text-brand-primary font-bold uppercase tracking-wider bg-brand-background px-3.5 py-1.5 rounded-lg border border-brand-secondary-light/40">
                        <Info className="w-4 h-4 text-brand-accent" /> Best for Head & Shoulder Tension
                      </div>
                    </div>
                  )}

                  {activeAnatomySpot === 'spot-lumbar' && (
                    <div className="space-y-4">
                      <h3 className="luxury-serif text-2xl font-bold text-brand-primary">Lower Lumbar Traction</h3>
                      <p className="text-brand-muted text-sm leading-relaxed font-light">
                        Allowing the lower back to hang freely helps create gentle space between tight spinal discs. This simple traction supports back mobility and comfort.
                      </p>
                      <div className="inline-flex items-center gap-2 text-xs text-brand-primary font-bold uppercase tracking-wider bg-brand-background px-3.5 py-1.5 rounded-lg border border-brand-secondary-light/40">
                        <Info className="w-4 h-4 text-brand-accent" /> Targets Lower Back Stiffness
                      </div>
                    </div>
                  )}

                  {activeAnatomySpot === 'spot-core' && (
                    <div className="space-y-4">
                      <h3 className="luxury-serif text-2xl font-bold text-brand-primary">Stabilization & Core Engagement</h3>
                      <p className="text-brand-muted text-sm leading-relaxed font-light">
                        Maintaining balance in the moving hammock engages your deep core and stabilizing muscles. Over time, this natural support helps strengthen your posture.
                      </p>
                      <div className="inline-flex items-center gap-2 text-xs text-brand-primary font-bold uppercase tracking-wider bg-brand-background px-3.5 py-1.5 rounded-lg border border-brand-secondary-light/40">
                        <Info className="w-4 h-4 text-brand-accent" /> Develops Core Stability
                      </div>
                    </div>
                  )}
                </div>

                <div className="border-t border-brand-secondary-light/40 pt-4 flex items-center justify-between text-xs text-brand-muted">
                  <span>* Safety rigging tested and certified.</span>
                  <button onClick={() => openBookingModal('Spinal Alignment Consultation')}
                    className="text-brand-accent font-bold uppercase hover:underline flex items-center gap-1">
                    Inquire consultation <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Signature 3-Phase Method Roadmap */}
      <section id="method" className="py-24 bg-brand-surface relative overflow-hidden reveal-on-scroll">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.25em] text-brand-accent font-bold">The Progression Roadmap</span>
            <h2 className="luxury-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-primary mt-3 leading-tight">Our Signature Method</h2>
            <p className="text-brand-muted mt-5 text-sm sm:text-base leading-relaxed font-light">We guide each student through three distinct structural phases to ensure a safe, satisfying transition to suspended aerial yoga.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10 max-w-5xl mx-auto">
            {/* Phase 1 */}
            <div className="bg-brand-background rounded-3xl p-8 border border-brand-secondary-light/60 shadow-sm relative flex flex-col justify-between">
              <div>
                <span className="text-brand-accent text-xs font-bold uppercase tracking-widest block mb-4">Phase 01</span>
                <h3 className="luxury-serif text-xl font-bold text-brand-primary mb-3">Tethered Gravity Relief</h3>
                <p className="text-brand-muted text-xs leading-relaxed font-light">
                  We begin with the fabric adjusted close to the ground. This phase focuses on learning fabric holds, safe hand wraps, and letting the hammock support partial body weight to build comfort.
                </p>
              </div>
              <div className="pt-6 border-t border-brand-secondary-light/30 mt-6 text-xs text-brand-primary font-semibold uppercase tracking-wider flex items-center gap-1.5">
                <SquareActivity className="w-4 h-4 text-brand-accent" /> Level: Low-Suspension
              </div>
            </div>

            {/* Phase 2 */}
            <div className="bg-brand-background rounded-3xl p-8 border border-brand-accent/50 shadow-sm relative flex flex-col justify-between transform md:-translate-y-4">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-accent text-white text-[9px] uppercase tracking-widest px-3 py-1 rounded-full font-bold">
                Recommended Start
              </div>
              <div>
                <span className="text-brand-accent text-xs font-bold uppercase tracking-widest block mb-4">Phase 02</span>
                <h3 className="luxury-serif text-xl font-bold text-brand-primary mb-3">Spinal Decompression</h3>
                <p className="text-brand-muted text-xs leading-relaxed font-light">
                  Once comfortable, we move into gentle, low-altitude inversions. This allows the weight of the torso to traction the spine, helping ease pressure in the neck, shoulders, and lower back.
                </p>
              </div>
              <div className="pt-6 border-t border-brand-secondary-light/30 mt-6 text-xs text-brand-primary font-semibold uppercase tracking-wider flex items-center gap-1.5">
                <ChevronsUpDown className="w-4 h-4 text-brand-accent" /> Level: Supported Inversions
              </div>
            </div>

            {/* Phase 3 */}
            <div className="bg-brand-background rounded-3xl p-8 border border-brand-secondary-light/60 shadow-sm relative flex flex-col justify-between">
              <div>
                <span className="text-brand-accent text-xs font-bold uppercase tracking-widest block mb-4">Phase 03</span>
                <h3 className="luxury-serif text-xl font-bold text-brand-primary mb-3">Dynamic Suspension Flow</h3>
                <p className="text-brand-muted text-xs leading-relaxed font-light">
                  Students explore full suspension balances, transitions, and sequenced poses. This stage challenges and refines overall flexibility, core stability, and full-body alignment.
                </p>
              </div>
              <div className="pt-6 border-t border-brand-secondary-light/30 mt-6 text-xs text-brand-primary font-semibold uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-brand-accent" /> Level: Full Suspension Flow
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-24 bg-brand-background reveal-on-scroll">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-xs uppercase tracking-[0.25em] text-brand-accent font-bold">Boutique Offerings</span>
            <h2 className="luxury-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-primary mt-3 leading-tight">Our Specialized Programs</h2>
            <p className="text-brand-muted mt-5 text-sm sm:text-base leading-relaxed font-light">Explore a variety of classes tailored to your experience level and wellness goals.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-brand-surface rounded-3xl p-8 border border-brand-secondary-light/60 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-[10px] uppercase font-bold text-brand-accent tracking-widest block">Beginner Standard</span>
                <h3 className="luxury-serif text-2xl font-bold text-brand-primary">Aerial Foundations</h3>
                <p className="text-brand-muted text-xs leading-relaxed font-light">
                  A gentle, step-by-step introduction to the aerial hammock. Learn basic grips, fabrics, wraps, and low-suspension balances designed to build confidence.
                </p>
              </div>
              <div className="pt-8 flex items-center justify-between border-t border-brand-secondary-light/30 mt-6">
                <span className="text-[11px] uppercase text-brand-primary font-bold tracking-wider">All Levels</span>
                <button onClick={() => openBookingModal('Aerial Foundations')}
                  className="text-xs font-bold text-brand-accent hover:text-brand-accent-dark transition-colors flex items-center gap-1">
                  Inquire <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="bg-brand-surface rounded-3xl p-8 border border-brand-secondary-light/60 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-[10px] uppercase font-bold text-brand-accent tracking-widest block">Intermediate Flow</span>
                <h3 className="luxury-serif text-2xl font-bold text-brand-primary">Aerial Flow Sequences</h3>
                <p className="text-brand-muted text-xs leading-relaxed font-light">
                  Integrate breath, physical sequences, and dynamic transitions. Focuses on full-body engagement, core stabilization, and continuous aerial coordination.
                </p>
              </div>
              <div className="pt-8 flex items-center justify-between border-t border-brand-secondary-light/30 mt-6">
                <span className="text-[11px] uppercase text-brand-primary font-bold tracking-wider">Intermediate</span>
                <button onClick={() => openBookingModal('Aerial Flow')}
                  className="text-xs font-bold text-brand-accent hover:text-brand-accent-dark transition-colors flex items-center gap-1">
                  Inquire <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="bg-brand-surface rounded-3xl p-8 border border-brand-secondary-light/60 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-[10px] uppercase font-bold text-brand-accent tracking-widest block">Restorative</span>
                <h3 className="luxury-serif text-2xl font-bold text-brand-primary">Therapeutic Decompression</h3>
                <p className="text-brand-muted text-xs leading-relaxed font-light">
                  Focuses on spinal decompression, hip openers, and restorative stretches. Highly recommended for back pain relief, using lower-set hammocks for ease of movement.
                </p>
              </div>
              <div className="pt-8 flex items-center justify-between border-t border-brand-secondary-light/30 mt-6">
                <span className="text-[11px] uppercase text-brand-primary font-bold tracking-wider">Spinal Relief</span>
                <button onClick={() => openBookingModal('Therapeutic Decompression')}
                  className="text-xs font-bold text-brand-accent hover:text-brand-accent-dark transition-colors flex items-center gap-1">
                  Inquire <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Timetable Section */}
      <section id="timetable" className="py-24 bg-brand-surface reveal-on-scroll">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.25em] text-brand-accent font-bold">Plan Your Practice</span>
            <h2 className="luxury-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-primary mt-3 leading-tight">Weekly Class Schedule</h2>
            <p className="text-brand-muted mt-5 text-sm sm:text-base leading-relaxed font-light">We structure our batches to accommodate varying schedules. Find the perfect routine below.</p>
          </div>

          {/* Day Tabs */}
          <div className="flex justify-center flex-wrap gap-2 mb-6">
            {['mon', 'tue', 'wed', 'thu', 'fri', 'sat'].map((day) => (
              <button key={day} onClick={() => setActiveTimetableDay(day)}
                className={`px-6 py-2.5 rounded-full text-xs uppercase tracking-widest font-bold transition-all duration-200 ${
                  activeTimetableDay === day
                    ? 'bg-brand-primary text-white shadow-sm'
                    : 'bg-brand-background text-brand-primary hover:bg-brand-secondary-light/40'
                }`}>
                {day === 'mon' ? 'Monday' : day === 'tue' ? 'Tuesday' : day === 'wed' ? 'Wednesday' : day === 'thu' ? 'Thursday' : day === 'fri' ? 'Friday' : 'Saturday'}
              </button>
            ))}
          </div>

          {/* Filters Sub-row */}
          <div className="flex justify-center gap-2 flex-wrap mb-10 pb-4 border-b border-brand-secondary-light/40">
            {[
              { id: 'all', label: 'All Classes' },
              { id: 'beginner', label: 'Beginner-Friendly' },
              { id: 'flow', label: 'Core & Flow' },
              { id: 'restorative', label: 'Restorative' }
            ].map((filt) => (
              <button key={filt.id} onClick={() => setActiveTimetableFilter(filt.id)}
                className={`px-4 py-1.5 border rounded-full text-[10px] uppercase tracking-widest font-bold transition-all ${
                  activeTimetableFilter === filt.id
                    ? 'border-brand-primary/40 bg-brand-primary text-white'
                    : 'border-brand-secondary-light text-brand-muted hover:bg-brand-secondary-light/30'
                }`}>
                {filt.label}
              </button>
            ))}
          </div>

          {/* Timetable List Grid */}
          <div className="bg-brand-background rounded-3xl border border-brand-secondary-light/80 overflow-hidden max-w-4xl mx-auto shadow-md">
            <div className="divide-y divide-brand-secondary-light/60">
              {getFilteredTimetable().length === 0 ? (
                <div className="p-8 text-center text-brand-muted text-xs sm:text-sm font-light">
                  No classes matching this category scheduled for today.
                </div>
              ) : (
                getFilteredTimetable().map((item, idx) => {
                  let badgeClass = "bg-green-100 text-green-800";
                  if (item.category === 'flow') badgeClass = "bg-purple-100 text-purple-800";
                  if (item.category === 'restorative') badgeClass = "bg-brand-secondary-light text-brand-primary";

                  return (
                    <div key={idx} className="p-6 sm:flex items-center justify-between gap-4 transition-all duration-150 hover:bg-brand-background">
                      <div className="flex items-center gap-6 mb-3 sm:mb-0">
                        <span className="text-sm sm:text-base font-bold text-brand-primary w-20 shrink-0">{item.time}</span>
                        <div>
                          <h4 className="font-bold text-brand-text text-xs sm:text-sm uppercase tracking-wider">{item.name}</h4>
                          <span className={`inline-block ${badgeClass} text-[10px] px-2.5 py-0.5 rounded-full font-medium mt-1`}>{item.level}</span>
                        </div>
                      </div>
                      <button onClick={() => openBookingModal(`${activeTimetableDay.toUpperCase()} ${item.time} - ${item.name}`)}
                        className="w-full sm:w-auto px-5 py-2.5 border border-brand-accent text-brand-accent hover:bg-brand-surface text-[10px] uppercase tracking-widest font-bold rounded-lg transition-colors">
                        Book Slot
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-24 bg-brand-background overflow-hidden relative">
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none bg-[radial-gradient(#C8A05A_1px,transparent_1px)] [background-size:24px_24px]"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.25em] text-brand-accent font-bold">Student Journeys</span>
            <h2 className="luxury-serif text-3xl sm:text-4xl font-bold text-brand-primary mt-3">Transformation Stories</h2>
          </div>

          <div className="relative bg-brand-surface rounded-3xl p-8 sm:p-12 border border-brand-secondary-light shadow-sm min-h-[320px] flex flex-col justify-between">
            {/* Dynamic testimonial block */}
            <div className="transition-opacity duration-300 ease-in-out">
              <div className="space-y-4">
                <div className="flex items-center gap-1">
                  {Array.from({ length: testimonialsData[currentTestimonialIndex].stars }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-brand-accent text-brand-accent" />
                  ))}
                </div>
                <h4 className="luxury-serif text-xl sm:text-2xl font-bold text-brand-primary">
                  "{testimonialsData[currentTestimonialIndex].title}"
                </h4>
                <p className="text-brand-muted text-xs sm:text-sm leading-relaxed font-light font-serif italic">
                  "{testimonialsData[currentTestimonialIndex].quote}"
                </p>
                <div className="pt-4">
                  <p className="font-bold text-brand-primary text-xs uppercase tracking-wider">
                    {testimonialsData[currentTestimonialIndex].user}
                  </p>
                  <p className="text-[10px] text-brand-muted mt-0.5">
                    {testimonialsData[currentTestimonialIndex].duration}
                  </p>
                </div>
              </div>
            </div>

            {/* Carousel Dot Navigation & Chevron Row */}
            <div className="flex items-center justify-between pt-8 border-t border-brand-secondary-light/40 mt-8">
              {/* Dot indicators */}
              <div className="flex gap-2">
                {testimonialsData.map((_, index) => (
                  <button key={index} onClick={() => setCurrentTestimonialIndex(index)}
                    className={index === currentTestimonialIndex ? "w-6 h-1.5 bg-brand-accent rounded-full transition-all" : "w-1.5 h-1.5 bg-brand-secondary/40 rounded-full transition-all"}
                    title={`Go to slide ${index + 1}`}></button>
                ))}
              </div>

              {/* Navigation controls */}
              <div className="flex gap-2">
                <button onClick={() => setCurrentTestimonialIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length)}
                  className="p-2 border border-brand-secondary/40 text-brand-primary rounded-full hover:bg-brand-background transition-colors"
                  title="Previous Story">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button onClick={() => setCurrentTestimonialIndex((prev) => (prev + 1) % testimonialsData.length)}
                  className="p-2 border border-brand-secondary/40 text-brand-primary rounded-full hover:bg-brand-background transition-colors"
                  title="Next Story">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lookbook Gallery Grid */}
      <section id="gallery" className="py-24 bg-brand-surface relative overflow-hidden reveal-on-scroll">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.25em] text-brand-accent font-bold">Visual Sanctuary</span>
            <h2 className="luxury-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-primary mt-3 leading-tight">Studio Lookbook</h2>
            <p className="text-brand-muted mt-4 text-sm sm:text-base leading-relaxed font-light">Explore a curated collection of captures showing our boutique practice frames, low-tension alignments, and calming environment.</p>
          </div>

          {/* Gallery Categories */}
          <div className="flex justify-center gap-3 flex-wrap mb-12">
            {[
              { id: 'all', label: 'All Photos' },
              { id: 'silks', label: 'Silks & Inversions' },
              { id: 'sound', label: 'Sound & Meditation' },
              { id: 'interior', label: 'Boutique Interior' }
            ].map((cat) => (
              <button key={cat.id} onClick={() => setActiveGalleryCategory(cat.id)}
                className={`px-5 py-2 border-b-2 font-bold text-xs uppercase tracking-wider transition-all ${
                  activeGalleryCategory === cat.id
                    ? 'border-brand-accent text-brand-primary'
                    : 'border-transparent text-brand-muted hover:text-brand-primary'
                }`}>
                {cat.label}
              </button>
            ))}
          </div>

          {/* Uneven organic grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
            {getFilteredGallery().map((item, index) => (
              <div key={item.id} onClick={() => openLightbox(index)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(index); } }}
                tabIndex={0} role="button" aria-label={`View photo: ${item.caption}`}
                className={`group cursor-pointer relative overflow-hidden bg-brand-surface border border-brand-secondary-light/60 p-2.5 shadow-sm hover:shadow-lg transition-all duration-300 ${item.shapeClass}`}>
                <div className={`w-full h-full overflow-hidden relative ${item.shapeClass.split(' ')[0]}`}>
                  <img src={item.url} alt={item.caption} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  
                  {/* Overlay hover details */}
                  <div className="absolute inset-0 bg-brand-primary/45 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <p className="text-white font-bold text-sm uppercase tracking-wider">{item.caption}</p>
                    <span className="text-[9px] text-brand-accent uppercase tracking-widest font-bold mt-1.5">{item.tagName}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Biography Journey */}
      <section className="py-24 bg-brand-background relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <div className="absolute -top-40 right-10 w-96 h-96 rounded-full bg-brand-secondary/40 filter blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative max-w-sm mx-auto">
                <div className="absolute -top-8 -left-8 w-44 h-44 rounded-full border border-brand-accent/40 pointer-events-none"></div>
                <div className="relative rounded-[5rem_2rem_6rem_3rem] overflow-hidden shadow-2xl bg-brand-surface aspect-[4/5] border border-brand-secondary-light/80 p-2 transform rotate-1">
                  <img src="https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&w=800&q=80"
                    alt="Disha Jhaveri - Founder" loading="lazy" className="w-full h-full object-cover rounded-[4.5rem_1.5rem_5.5rem_2.5rem]" />
                </div>
              </div>
            </div>

            {/* Right Biography */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs uppercase tracking-[0.25em] text-brand-accent font-bold">The Teacher's Path</span>
              <h2 className="luxury-serif text-3xl sm:text-4xl font-bold text-brand-primary leading-tight">Disha Jhaveri</h2>
              <h3 className="font-medium text-brand-primary uppercase tracking-wider text-sm">Lead Instructor & Certified Aerial Specialist</h3>

              <p className="text-brand-muted text-sm sm:text-base leading-relaxed font-light">
                With multiple certifications in suspension training, advanced Hatha alignment, and structural decompression therapy, Disha Jhaveri established <strong>The Waves Aerial Yoga</strong> as a dedicated space to combine fitness, confidence, and safety in Surat.
              </p>
              <p className="text-brand-muted text-sm sm:text-base leading-relaxed font-light">
                She has spent over seven years training across specialized regional institutes, refining the spot-safety protocols and gentle cueing methods that define our boutique studio practice today.
              </p>

              {/* Accreditations list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-brand-secondary-light/50">
                <div className="flex items-start gap-2 text-xs text-brand-muted">
                  <Award className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
                  <span>Certified Aerial Yoga Specialist (Spinal Decompression & Alignment focus)</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-brand-muted">
                  <Award className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
                  <span>500+ Hours Certified Multi-Style Hatha Teacher</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-brand-muted">
                  <Award className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
                  <span>Sound Therapist & Restorative Healing practitioner</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Studio Sanctuary Philosophy */}
      <section className="py-24 bg-brand-surface relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-8 relative z-10">
          <span className="text-xs uppercase tracking-[0.25em] text-brand-accent font-bold">Mindful Design</span>
          <h2 className="luxury-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-primary leading-tight">The Studio Sanctuary Philosophy</h2>
          <div className="w-12 h-0.5 bg-brand-accent mx-auto"></div>
          <p className="text-brand-muted text-sm sm:text-lg leading-relaxed font-light max-w-3xl mx-auto italic">
            "We believe that a studio space directly shapes the state of your mind. We maintain a limited intake for each batch to ensure every practitioner has adequate space, individual spotting attention, and room to focus."
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 text-left max-w-4xl mx-auto">
            <div className="space-y-2">
              <h4 className="font-bold text-brand-primary text-sm uppercase tracking-wider">Air Quality</h4>
              <p className="text-brand-muted text-xs font-light leading-relaxed">Continuous HEPA filtration maintains fresh, clean air throughout each active class.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-brand-primary text-sm uppercase tracking-wider">Bespoke Lighting</h4>
              <p className="text-brand-muted text-xs font-light leading-relaxed">Soft, warm dimmers and ambient lighting ease eye strain during restorative flows.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-brand-primary text-sm uppercase tracking-wider">Personal Spacing</h4>
              <p className="text-brand-muted text-xs font-light leading-relaxed">Spacious rigging coordinates ensure safe and generous personal space for every hammock.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-brand-primary text-sm uppercase tracking-wider">Safety Spotting</h4>
              <p className="text-brand-muted text-xs font-light leading-relaxed">We keep our class sizes small to allow for direct spotting support during inversions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Explorer */}
      <section id="facilities" className="py-24 bg-brand-background reveal-on-scroll">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Image display */}
            <div className="lg:col-span-5 relative order-last lg:order-first">
              <div className="relative max-w-sm mx-auto">
                <div className="absolute -inset-4 border border-brand-accent rounded-3xl pointer-events-none"></div>
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-brand-surface shadow-lg border border-brand-secondary-light p-2.5">
                  <img src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80"
                    alt="Studio interior" loading="lazy" className="w-full h-full object-cover rounded-xl" />
                </div>
              </div>
            </div>

            {/* Right tabs and details */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] text-brand-accent font-bold">Virtual Studio Tour</span>
                <h2 className="luxury-serif text-3xl sm:text-4xl font-bold text-brand-primary mt-3 leading-tight">The Space</h2>
                <p className="text-brand-muted text-sm sm:text-base mt-4 font-light leading-relaxed">
                  Every element of our space is curated to support a calm, comfortable practice. Explore our specialized studio facilities.
                </p>
              </div>

              {/* Tabs */}
              <div className="flex gap-2 flex-wrap pb-2 border-b border-brand-secondary-light/40">
                {[
                  { id: 'tab-rigging', label: 'Safety Rigging Grid' },
                  { id: 'tab-silks', label: 'Premium Silks' },
                  { id: 'tab-acoustics', label: 'Sound Space' }
                ].map((tab) => (
                  <button key={tab.id} onClick={() => setActiveFacilityTab(tab.id)}
                    className={`px-4 py-2 border-b-2 font-bold text-xs uppercase tracking-wider transition-colors ${
                      activeFacilityTab === tab.id
                        ? 'border-brand-accent text-brand-primary'
                        : 'border-transparent text-brand-muted hover:text-brand-primary'
                    }`}>
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Details Content */}
              <div className="space-y-4">
                {activeFacilityTab === 'tab-rigging' && (
                  <div className="space-y-4">
                    <h4 className="font-bold text-brand-primary text-lg">Safety Certified Rigging Grid</h4>
                    <p className="text-brand-muted text-xs sm:text-sm leading-relaxed font-light">
                      Our structural steel support systems are professionally installed and certified. Each anchor point is engineered to securely handle upward loads of 400 kg.
                    </p>
                    <ul className="space-y-2 text-xs text-brand-text">
                      <li className="flex items-center gap-2"><Check className="w-4 h-4 text-brand-accent" /> Dual anchor point safety rigging</li>
                      <li className="flex items-center gap-2"><Check className="w-4 h-4 text-brand-accent" /> Daily hardware and security checks</li>
                    </ul>
                  </div>
                )}

                {activeFacilityTab === 'tab-silks' && (
                  <div className="space-y-4">
                    <h4 className="font-bold text-brand-primary text-lg">Premium Low-Stretch Silks</h4>
                    <p className="text-brand-muted text-xs sm:text-sm leading-relaxed font-light">
                      We utilize high-grade, non-slick technical fabrics. This material provides gentle support for both climbing sequences and deep stretches.
                    </p>
                    <ul className="space-y-2 text-xs text-brand-text">
                      <li className="flex items-center gap-2"><Check className="w-4 h-4 text-brand-accent" /> Hypoallergenic fabric material</li>
                      <li className="flex items-center gap-2"><Check className="w-4 h-4 text-brand-accent" /> Gentle structural support for active grips</li>
                    </ul>
                  </div>
                )}

                {activeFacilityTab === 'tab-acoustics' && (
                  <div className="space-y-4">
                    <h4 className="font-bold text-brand-primary text-lg">Sound & Acoustic Space</h4>
                    <p className="text-brand-muted text-xs sm:text-sm leading-relaxed font-light">
                      Our studio features balanced sound isolation to minimize outside noise, creating a calm environment for sound baths and relaxation.
                    </p>
                    <ul className="space-y-2 text-xs text-brand-text">
                      <li className="flex items-center gap-2"><Check className="w-4 h-4 text-brand-accent" /> Clean, balanced room acoustics</li>
                      <li className="flex items-center gap-2"><Check className="w-4 h-4 text-brand-accent" /> Calm atmosphere for guided meditation</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing / Membership Customizer Section */}
      <section id="pricing" className="py-24 bg-brand-surface relative reveal-on-scroll">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.25em] text-brand-accent font-bold">Build Your Routine</span>
            <h2 className="luxury-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-primary mt-3 leading-tight">Membership Customizer</h2>
            <p className="text-brand-muted mt-5 text-sm sm:text-base leading-relaxed font-light">Select your preferred frequency and optional add-ons to find the perfect plan for your practice.</p>
          </div>

          <div className="bg-brand-background rounded-3xl p-8 sm:p-12 border border-brand-secondary-light/80 shadow-md max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Input controls (7 cols) */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <span className="text-[10px] uppercase font-bold text-brand-accent tracking-widest block mb-4">Training Frequency</span>
                <div className="grid grid-cols-3 gap-2 sm:gap-4">
                  {/* Option 1 */}
                  <label className="cursor-pointer">
                    <input type="radio" name="calc-frequency" value="trial" checked={frequency === 'trial'}
                      onChange={() => setFrequency('trial')} className="peer hidden" />
                    <div className="p-4 text-center border border-brand-secondary-light rounded-2xl bg-brand-surface peer-checked:border-brand-primary peer-checked:bg-brand-secondary-light/30 transition-all">
                      <span className="font-bold text-brand-primary block text-sm">1 Session</span>
                      <span className="text-[10px] text-brand-muted block mt-1">Trial Run</span>
                    </div>
                  </label>
                  {/* Option 2 */}
                  <label className="cursor-pointer">
                    <input type="radio" name="calc-frequency" value="monthly" checked={frequency === 'monthly'}
                      onChange={() => setFrequency('monthly')} className="peer hidden" />
                    <div className="p-4 text-center border border-brand-secondary-light rounded-2xl bg-brand-surface peer-checked:border-brand-primary peer-checked:bg-brand-secondary-light/30 transition-all">
                      <span className="font-bold text-brand-primary block text-sm">8 Sessions</span>
                      <span className="text-[10px] text-brand-muted block mt-1">Monthly Pass</span>
                    </div>
                  </label>
                  {/* Option 3 */}
                  <label className="cursor-pointer">
                    <input type="radio" name="calc-frequency" value="unlimited" checked={frequency === 'unlimited'}
                      onChange={() => setFrequency('unlimited')} className="peer hidden" />
                    <div className="p-4 text-center border border-brand-secondary-light rounded-2xl bg-brand-surface peer-checked:border-brand-primary peer-checked:bg-brand-secondary-light/30 transition-all">
                      <span className="font-bold text-brand-primary block text-sm">Unlimited</span>
                      <span className="text-[10px] text-brand-muted block mt-1">Full Access</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Toggles */}
              <div>
                <span className="text-[10px] uppercase font-bold text-brand-accent tracking-widest block mb-4">Optional Add-ons</span>
                <div className="space-y-3">
                  <label className="flex items-center justify-between p-4 bg-brand-surface rounded-2xl border border-brand-secondary-light cursor-pointer">
                    <div className="flex items-center gap-3">
                      <input type="checkbox" checked={addSoundBath} onChange={() => setAddSoundBath(!addSoundBath)} className="w-4 h-4 accent-brand-accent" />
                      <div>
                        <span className="font-bold text-brand-primary text-sm block">Sound Healing Pass</span>
                        <span className="text-[10px] text-brand-muted">Includes monthly entry to our guided relaxation workshop</span>
                      </div>
                    </div>
                    <span className="text-xs text-brand-accent font-bold">+ ₹499</span>
                  </label>

                  <label className="flex items-center justify-between p-4 bg-brand-surface rounded-2xl border border-brand-secondary-light cursor-pointer">
                    <div className="flex items-center gap-3">
                      <input type="checkbox" checked={addConsultation} onChange={() => setAddConsultation(!addConsultation)} className="w-4 h-4 accent-brand-accent" />
                      <div>
                        <span className="font-bold text-brand-primary text-sm block">1-on-1 Alignment Check</span>
                        <span className="text-[10px] text-brand-muted">Single personalized evaluation focused on form and mobility</span>
                      </div>
                    </div>
                    <span className="text-xs text-brand-accent font-bold">+ ₹999</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Right Output Price box */}
            <div className="lg:col-span-5 bg-brand-surface p-6 rounded-2xl border border-brand-secondary-light/80 shadow-md flex flex-col justify-between h-full min-h-[300px]">
              <div className="space-y-4 text-center lg:text-left">
                <span className="text-[10px] uppercase font-bold text-brand-accent tracking-widest">Calculated Fee</span>
                <div>
                  <span className="luxury-serif text-5xl font-bold text-brand-primary">{calculatedInfo.price}</span>
                  <span className="text-xs text-brand-muted">{calculatedInfo.unit}</span>
                </div>
                <p className="text-brand-muted text-xs leading-relaxed font-light">
                  {calculatedInfo.desc}
                </p>
              </div>

              <div className="pt-6 border-t border-brand-secondary-light/40 mt-6">
                <button onClick={() => openBookingModal(`Custom Plan Order (Value: ${calculatedInfo.price})`)}
                  className="w-full bg-brand-primary hover:bg-brand-primary-dark text-white text-xs uppercase tracking-widest font-bold py-3.5 rounded-xl transition-all shadow-md">
                  Reserve Custom Routine
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section id="faq" className="py-24 bg-brand-background reveal-on-scroll">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.25em] text-brand-accent font-bold">Common Inquiries</span>
            <h2 className="luxury-serif text-3xl font-bold text-brand-primary mt-3">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {[
              { q: "Is aerial yoga safe for first-time beginners?", a: "Yes, absolutely. Most of our regular students started with zero background in aerial movements. Our beginner classes adjust hammock heights lower to the ground, focusing heavily on basic grip locks and safety alignments first." },
              { q: "What should I wear to my first class?", a: "We highly recommend form-fitting athletic wear that covers the backs of your knees and underarms to prevent direct fabric friction with the silk hammocks. Please avoid wearing jewelry, zippers, or hairpins that could catch on the delicate silk material." },
              { q: "Are there specific weight limits for suspension?", a: "Our professional support grid and fabric anchors are rated to support up to 400 kg. However, to ensure movement safety and comfort inside the silk hammocks, we recommend a general limit of 110 kg." },
              { q: "Who should avoid inverting inside the silk hammocks?", a: "While aerial yoga is highly therapeutic, inverting should be avoided if you have high blood pressure, glaucoma, severe vertigo, or are in the late stages of pregnancy. Feel free to alert our studio coordinators in advance so we can adapt your movements accordingly." },
              { q: "What are the class age requirements?", a: "Our general adult classes are open to practitioners aged 15 and above. For younger practitioners, we offer our dedicated, structured **Kids Aerial Program** to maintain optimized class coordination and safety." },
              { q: "Is aerial yoga actually a real workout, or just stretching?", a: "It's both. Independent research commissioned by the American Council on Exercise found that a single 50-minute aerial class burns roughly the same calories as brisk walking or light cycling, while also engaging stabilizing core muscles throughout each pose. Over a six-week period of consistent practice, the same research recorded improvements in several cardiovascular health markers alongside the expected flexibility gains." }
            ].map((faq, index) => {
              const idx = index + 1;
              const isOpen = !!openAccordions[idx];
              return (
                <div key={idx} className="bg-brand-surface rounded-2xl border border-brand-secondary-light/80 overflow-hidden shadow-sm">
                  <button onClick={() => toggleAccordion(idx)} aria-expanded={isOpen} aria-controls={`faq-accord-ans-${idx}`}
                    className="w-full p-6 text-left font-semibold text-brand-primary flex items-center justify-between">
                    <span className="text-sm sm:text-base">{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-brand-accent transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div id={`faq-accord-ans-${idx}`} className="px-6 pb-6 text-brand-muted text-xs sm:text-sm leading-relaxed border-t border-brand-secondary-light/40 pt-4 font-light">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Booking Form & Contact Details Section */}
      <section className="py-24 bg-brand-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Details Box (5 cols) */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] text-brand-accent font-bold">Visit the Sanctuary</span>
                <h2 className="luxury-serif text-3xl font-bold text-brand-primary mt-3">Get in Touch</h2>
                <p className="text-brand-muted mt-3 text-sm font-light leading-relaxed">We welcome pre-scheduled studio tours. Reach out directly through any of the channels below.</p>
              </div>

              <div className="space-y-6">
                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="bg-brand-background p-3 rounded-2xl text-brand-primary border border-brand-secondary-light">
                    <MapPin className="w-6 h-6 text-brand-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-primary text-sm uppercase tracking-wider">Studio Location</h4>
                    <p className="text-xs sm:text-sm text-brand-muted mt-1 leading-relaxed font-light">
                      The Waves Aerial Yoga Studio,<br />
                      Vesu / City Light Area,<br />
                      Surat, Gujarat - 395007
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="bg-brand-background p-3 rounded-2xl text-brand-primary border border-brand-secondary-light">
                    <Phone className="w-6 h-6 text-brand-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-primary text-sm uppercase tracking-wider">Phone & WhatsApp</h4>
                    <p className="text-xs sm:text-sm text-brand-muted mt-1 font-light">+91 87338 88476</p>
                  </div>
                </div>

                {/* Instagram */}
                <div className="flex items-start gap-4">
                  <div className="bg-brand-background p-3 rounded-2xl text-brand-primary border border-brand-secondary-light">
                    <Instagram className="w-6 h-6 text-brand-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-primary text-sm uppercase tracking-wider">Follow Our Journey</h4>
                    <a href="https://www.instagram.com/the_waves_yoga/" target="_blank" rel="noopener noreferrer"
                      className="text-xs sm:text-sm text-brand-accent hover:underline mt-1 block font-light">@the_waves_yoga</a>
                  </div>
                </div>
              </div>

              {/* Map Box */}
              <div className="rounded-3xl overflow-hidden border border-brand-secondary-light h-56 bg-brand-background relative shadow-inner">
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <Navigation className="w-8 h-8 text-brand-accent mb-2" />
                  <p className="text-brand-primary font-bold text-sm uppercase tracking-wider">Vesu / City Light, Surat</p>
                  <p className="text-[11px] text-brand-muted mt-1 max-w-xs font-light">Conveniently accessible with central street parking.</p>
                  <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer"
                    className="mt-4 px-5 py-2.5 bg-brand-surface rounded-full text-[10px] uppercase tracking-widest font-bold text-brand-primary border border-brand-secondary-light hover:bg-brand-background transition-all">
                    Open Google Maps
                  </a>
                </div>
              </div>
            </div>

            {/* Right Form Box */}
            <div className="lg:col-span-7 bg-brand-background p-8 sm:p-12 rounded-3xl border border-brand-secondary-light shadow-sm">
              <h3 className="luxury-serif text-2xl font-bold text-brand-primary mb-2">Send Studio Inquiry</h3>
              <p className="text-brand-muted text-xs sm:text-sm mb-6 font-light">Fill out the form below and a coordinator will contact you to select a slot.</p>

              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-brand-muted font-bold mb-1">Your Name *</label>
                    <input type="text" required name="name"
                      className="w-full bg-brand-surface border border-brand-secondary-light/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-secondary/40" />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-brand-muted font-bold mb-1">WhatsApp Mobile *</label>
                    <input type="tel" required name="phone" placeholder="e.g., 98765 43210"
                      className="w-full bg-brand-surface border border-brand-secondary-light/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-secondary/40" />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-brand-muted font-bold mb-1">Class Option of Interest</label>
                  <select defaultValue="Introductory Trial Slot" name="class_type"
                    className="w-full bg-brand-surface border border-brand-secondary-light/80 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-secondary/40 text-brand-text">
                    <option value="Introductory Trial Slot">Introductory Trial Class — ₹499</option>
                    <option value="Standard Monthly Plan">Standard Monthly Membership — ₹3,999</option>
                    <option value="Unlimited Monthly Plan">Unlimited Membership — ₹6,999</option>
                    <option value="Kids Aerial Yoga">Kids Aerial Yoga</option>
                    <option value="Teacher Training Program">Teacher Training Certification</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-brand-muted font-bold mb-1">Personal Goals or Physical Concerns</label>
                  <textarea name="message" rows="4"
                    placeholder="Please mention any structural stiffness, posture goals, or back pain concerns..."
                    className="w-full bg-brand-surface border border-brand-secondary-light/80 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-secondary/40 font-light"></textarea>
                </div>

                {formStatus && (
                  <div className={`p-4 rounded-xl text-xs sm:text-sm font-medium border ${
                    formStatus.type === 'success' 
                      ? 'bg-green-100 text-green-900 border-green-300' 
                      : 'bg-green-50 text-green-800 border-green-200'
                  }`}>
                    {formStatus.text}
                  </div>
                )}

                <button type="submit"
                  className="w-full bg-brand-primary hover:bg-brand-primary-dark text-white text-xs uppercase tracking-widest font-bold py-4 rounded-xl transition-all duration-200 text-center flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" /> Submit Inquiry Details
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-primary text-brand-secondary-light pt-16 pb-12 border-t border-brand-primary-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="space-y-4 md:col-span-2">
              <span className="luxury-serif text-2xl font-bold tracking-wider text-white leading-none">THE WAVES</span>
              <span className="block text-[10px] tracking-widest text-brand-accent uppercase font-bold">Aerial Yoga Studio</span>
              <p className="text-xs sm:text-sm text-brand-secondary-light/80 max-w-sm mt-4 font-light leading-relaxed">
                Providing safe, structured, and customized alignment therapy and suspension fitness training. Explore deep decompression in a premium studio environment in Surat.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-white font-bold text-xs tracking-widest uppercase">Quick Links</h4>
              <ul className="space-y-2 text-xs font-light">
                <li><a href="#why-aerial" className="hover:text-brand-accent transition-colors">Why Aerial Yoga</a></li>
                <li><a href="#programs" className="hover:text-brand-accent transition-colors">Offered Programs</a></li>
                <li><a href="#timetable" className="hover:text-brand-accent transition-colors">Weekly Timetable</a></li>
                <li><a href="#pricing" className="hover:text-brand-accent transition-colors">Membership Fees</a></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-white font-bold text-xs tracking-widest uppercase">Contact Channels</h4>
              <ul className="space-y-2 text-xs text-brand-secondary-light/80 font-light">
                <li>Vesu / City Light, Surat, Gujarat</li>
                <li>Call/WhatsApp: +91 87338 88476</li>
                <li>Founder: Disha Jhaveri</li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-brand-primary-dark/60 text-center text-[10px] sm:text-xs text-brand-secondary-light/50 flex flex-col sm:flex-row items-center justify-between gap-4 font-light">
            <p>&copy; 2025 The Waves Aerial Yoga. All Rights Reserved.</p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Contact */}
      <a href="https://wa.me/918733888476" target="_blank" rel="noopener noreferrer" aria-label="Chat with us on WhatsApp"
        className="fixed bottom-24 sm:bottom-8 right-5 sm:right-8 z-40 bg-[#25D366] hover:bg-[#1ebe5a] text-white w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-transform hover:scale-110">
        <MessageCircle className="w-7 h-7" />
      </a>


      {/* Interactive Booking Modal */}
      {bookingModalPreset !== null && (
        <div id="booking-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="booking-modal-title">
          <div className="absolute inset-0 bg-brand-text/60 backdrop-blur-sm" onClick={closeBookingModal}></div>
          <div className="relative bg-brand-surface rounded-3xl shadow-2xl w-full max-w-md overflow-hidden z-10 border border-brand-secondary-light/80">
            <div className="bg-brand-primary p-6 text-white flex items-center justify-between">
              <div>
                <h3 id="booking-modal-title" className="luxury-serif text-lg font-bold tracking-wider">Class Reservation</h3>
                <p className="text-[10px] text-brand-secondary-light/80 mt-1 uppercase tracking-widest">Verify Slot Availability</p>
              </div>
              <button onClick={closeBookingModal} className="text-white/85 hover:text-white hover:bg-brand-primary-dark p-2 rounded-lg transition-colors" aria-label="Close booking form">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleModalReservationSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-brand-muted font-bold mb-1">Selected Program Slot</label>
                <input type="text" value={bookingModalPreset} readOnly
                  className="w-full bg-brand-background border border-brand-secondary-light rounded-xl px-3.5 py-2 text-sm text-brand-primary font-bold focus:outline-none" />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-brand-muted font-bold mb-1">Your Name *</label>
                <input type="text" required name="m_name"
                  className="w-full border border-brand-secondary-light rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-secondary/40" />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-brand-muted font-bold mb-1">WhatsApp Phone *</label>
                <input type="tel" required name="m_phone" placeholder="98765 43210"
                  className="w-full border border-brand-secondary-light rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-secondary/40" />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-brand-muted font-bold mb-1">Preferred Time of Day</label>
                <select name="m_time"
                  className="w-full border border-brand-secondary-light rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-secondary/40 text-brand-text">
                  <option value="Morning Slots (7 AM - 10 AM)">Morning Batches (7 AM - 10 AM)</option>
                  <option value="Evening Slots (5 PM - 8 PM)">Evening Batches (5 PM - 8 PM)</option>
                </select>
              </div>

              {modalStatus && (
                <div className={`p-3 rounded-lg text-[10px] font-bold uppercase tracking-widest text-center border ${
                  modalStatus.type === 'success'
                    ? 'bg-green-100 text-green-900 border-green-300'
                    : 'bg-green-50 text-green-800 border-green-200'
                }`}>
                  {modalStatus.text}
                </div>
              )}

              <div className="pt-2">
                <button type="submit"
                  className="w-full bg-brand-accent hover:bg-brand-accent-dark text-brand-primary text-xs uppercase tracking-widest font-bold py-3.5 rounded-xl transition-all text-center flex items-center justify-center gap-2 shadow-md">
                  <Check className="w-4 h-4" /> Confirm Reservation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {activeLightboxIndex !== null && (
        <div id="gallery-lightbox" className="fixed inset-0 z-50 flex flex-col justify-center items-center p-4" role="dialog" aria-modal="true" aria-label="Gallery photo preview">
          <div className="absolute inset-0 bg-brand-text/95 backdrop-blur-md" onClick={closeLightbox}></div>

          <div className="relative z-10 max-w-4xl w-full flex flex-col justify-center items-center space-y-4">
            <div className="absolute top-[-44px] right-2 flex items-center gap-4">
              <button onClick={closeLightbox} className="text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors" aria-label="Close gallery preview">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="relative w-full flex justify-center items-center">
              <button onClick={() => navigateLightbox(-1)} className="absolute left-2 sm:left-[-64px] bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all" aria-label="Previous photo">
                <ChevronLeft className="w-6 h-6" />
              </button>

              <div className="max-h-[70vh] rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-black">
                <img src={getFilteredGallery()[activeLightboxIndex]?.url} alt="Zoomed view" className="object-contain max-h-[70vh] w-full" />
              </div>

              <button onClick={() => navigateLightbox(1)} className="absolute right-2 sm:right-[-64px] bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all" aria-label="Next photo">
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            <div className="text-center text-white space-y-1 select-none">
              <h4 className="luxury-serif text-lg font-bold">{getFilteredGallery()[activeLightboxIndex]?.caption}</h4>
              <p className="text-xs text-brand-accent uppercase tracking-widest font-semibold">{getFilteredGallery()[activeLightboxIndex]?.tagName}</p>
            </div>
          </div>
        </div>
      )}
      </div>{/* end pt-20 page body */}
    </div>
  );
}
