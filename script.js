document.addEventListener('DOMContentLoaded', () => {

    // ===== RANDOM BACKGROUND VIDEO =====
    const bgVideos = [
        'assets/VIDEO/BACKGROUND/v1.mp4',
        'assets/VIDEO/BACKGROUND/v2.mp4',
        
        'assets/VIDEO/BACKGROUND/v4.mp4',
        'assets/VIDEO/BACKGROUND/v5.mp4'
    ];
    const heroVideo = document.getElementById('hero-video');
    if (heroVideo) {
        // Pick a random starting video
        let currentVideoIndex = Math.floor(Math.random() * bgVideos.length);

        const loadVideo = (index) => {
            heroVideo.src = bgVideos[index];
            heroVideo.muted = true; // explicitly set to ensure autoplay works
            heroVideo.load();
            heroVideo.play().catch(err => {
                console.log("Hero video autoplay block:", err);
            });
        };

        // When a video ends, pick the next one in sequence (not same index)
        heroVideo.addEventListener('ended', () => {
            currentVideoIndex = (currentVideoIndex + 1) % bgVideos.length;
            loadVideo(currentVideoIndex);
        });

        // Load initial random video
        loadVideo(currentVideoIndex);
    }
    // ===== NAVBAR SCROLL EFFECT =====
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 60) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // ===== MOBILE MENU TOGGLE =====
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('open');
            if (navbar) {
                navbar.classList.toggle('menu-open');
            }
        });

        // Close menu when a nav link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('open');
                if (navbar) {
                    navbar.classList.remove('menu-open');
                }
            });
        });
    }

    // Chatbot Elements
    const chatbotToggleBtn = document.getElementById('chatbot-toggle');
    const chatbotWindow = document.getElementById('chatbot-window');
    const closeChatBtn = document.getElementById('close-chat');
    const chatBody = document.getElementById('chat-body');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    const chatBackdrop = document.getElementById('chatbot-backdrop');

    // Helper: open chatbot
    if (chatbotToggleBtn && chatbotWindow && closeChatBtn && chatBody && chatInput && sendBtn) {
        function openChatbot() {
            chatbotWindow.classList.remove('hidden');
            chatbotToggleBtn.style.display = 'none';
            if (chatBackdrop) chatBackdrop.classList.add('active');
            // Focus input after animation
            setTimeout(() => chatInput && chatInput.focus(), 350);
        }

        // Helper: close chatbot
        function closeChatbot() {
            chatbotWindow.classList.add('hidden');
            chatbotToggleBtn.style.display = 'flex';
            if (chatBackdrop) chatBackdrop.classList.remove('active');
        }

        // Toggle Chatbot Window
        chatbotToggleBtn.addEventListener('click', openChatbot);
        closeChatBtn.addEventListener('click', closeChatbot);

        // Close chatbot when tapping the dark backdrop (mobile)
        if (chatBackdrop) {
            chatBackdrop.addEventListener('click', closeChatbot);
        }

        // Close chatbot with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !chatbotWindow.classList.contains('hidden')) {
                closeChatbot();
            }
        });

        // Auto-open the popup modal on page load after 1 second
        setTimeout(openChatbot, 1000);

        // Chatbot Logic
        const botResponses = {
            "hello": "Hello! Welcome to Dhanlaxmi Enterprise. We are specialists in all petrol pump safety materials, fire extinguishers, and emergency safety systems. How can we help you today?",
            "hi": "Hello! Welcome to Dhanlaxmi Enterprise. How can we assist you with petrol pump safety materials today?",
            "hey": "Hi there! Welcome to Dhanlaxmi Enterprise. What safety equipment are you looking for today?",
            "catalog": "You can view or download our product catalog by clicking the 'Visit our Product Catalog' button at the top of this chat. We supply high-grade certified extinguishers, dispensing nozzles, hazard signages, tank valves, and spill kits.",
            "product": "We offer a complete range of petrol pump safety materials: certified extinguishers, dispensing nozzles, fuel hoses, safety signages, tank fittings, spill kits, and flameproof lights. Click 'Visit our Product Catalog' above for more details.",
            "nozzle": "We supply top-grade petrol and diesel dispensing nozzles, fuel transfer hoses, and breakaway couplings designed to prevent leaks and accidents at fuel stations.",
            "hose": "We supply top-grade petrol and diesel dispensing nozzles, fuel transfer hoses, and breakaway couplings designed to prevent leaks and accidents at fuel stations.",
            "extinguisher": "We provide ISO/ISI-certified DCP, CO2, Foam, and Clean Agent fire extinguishers, specially calibrated for fuel station fires and electrical safety.",
            "fire": "We provide ISO/ISI-certified DCP, CO2, Foam, and Clean Agent fire extinguishers, specially calibrated for fuel station fires and electrical safety.",
            "cylinder": "We provide ISO/ISI-certified DCP, CO2, Foam, and Clean Agent fire extinguishers, specially calibrated for fuel station fires and electrical safety.",
            "signage": "Dhanlaxmi Enterprise offers luminous warning signs, flameproof LED sign boards, speed breakers, and safety traffic cones to manage station safety.",
            "sign": "Dhanlaxmi Enterprise offers luminous warning signs, flameproof LED sign boards, speed breakers, and safety traffic cones to manage station safety.",
            "tank": "Our premium underground tank fittings include under-pump shear valves, flame arrestors, check valves, and safety dip rods to prevent vapor hazards.",
            "valve": "Our premium underground tank fittings include under-pump shear valves, flame arrestors, check valves, and safety dip rods to prevent vapor hazards.",
            "spill": "We provide emergency fuel spill response kits, absorbent pads, chemical spill containment tools, and heavy-duty fire blankets for station emergencies.",
            "kit": "We provide emergency fuel spill response kits, absorbent pads, chemical spill containment tools, and heavy-duty fire blankets for station emergencies.",
            "light": "We offer intrinsically safe, explosion-proof LED canopy lights, junction boxes, and flameproof manual call point fire alarms.",
            "alarm": "We offer intrinsically safe, explosion-proof LED canopy lights, junction boxes, and flameproof manual call point fire alarms.",
            "price": "For custom pricing, bulk orders, and official quotes on petrol pump materials, please click the WhatsApp button on the bottom left to chat with our sales team, or call us at +91 7972701472!",
            "cost": "For custom pricing, bulk orders, and official quotes on petrol pump materials, please click the WhatsApp button on the bottom left to chat with our sales team, or call us at +91 7972701472!",
            "quote": "For custom pricing, bulk orders, and official quotes on petrol pump materials, please click the WhatsApp button on the bottom left to chat with our sales team, or call us at +91 7972701472!",
            "contact": "You can reach Dhanlaxmi Enterprise via Phone at +91 7972701472, WhatsApp, or Email using the contact floating buttons on the bottom left.",
            "default": "I'm the safety assistant for Dhanlaxmi Enterprise. You can ask me about 'catalog', 'nozzles', 'extinguishers', 'signage', 'spill kits', 'tank fittings', 'pricing', or 'contact' details."
        };

        function appendMessage(message, sender, isTyping = false) {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message');
            if (sender === 'bot') {
                messageDiv.classList.add('bot-message');
            } else {
                messageDiv.classList.add('user-message');
            }
            
            const p = document.createElement('p');
            messageDiv.appendChild(p);
            chatBody.appendChild(messageDiv);
            chatBody.scrollTop = chatBody.scrollHeight;

            if (isTyping) {
                let i = 0;
                const typingInterval = setInterval(() => {
                    if (i < message.length) {
                        p.innerHTML += message.charAt(i);
                        i++;
                        chatBody.scrollTop = chatBody.scrollHeight;
                    } else {
                        clearInterval(typingInterval);
                    }
                }, 30);
            } else {
                p.innerHTML = message;
            }
        }

        function speakText(text) {
            if ('speechSynthesis' in window) {
                // Cancel any ongoing speech
                window.speechSynthesis.cancel();
                const utterance = new SpeechSynthesisUtterance(text);
                utterance.rate = 1.0;
                utterance.pitch = 1.0;
                utterance.volume = 1.0;
                window.speechSynthesis.speak(utterance);
            } else {
                console.log("Text-to-Speech not supported in this browser.");
            }
        }

        function handleUserInput() {
            const userText = chatInput.value.trim().toLowerCase();
            if (userText === "") return;

            // Append user message
            appendMessage(chatInput.value, 'user');
            chatInput.value = '';

            // Simulate thinking time
            setTimeout(() => {
                let response = botResponses["default"];
                
                // Simple keyword matching
                for (const key in botResponses) {
                    if (userText.includes(key)) {
                        response = botResponses[key];
                        break;
                    }
                }

                // Append bot message with typing effect
                appendMessage(response, 'bot', true);
                
                // Speak the response
                speakText(response);
                
            }, 600);
        }

        sendBtn.addEventListener('click', handleUserInput);
        
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleUserInput();
            }
        });
    }
});

// ===== GLOBAL VIDEO MUTE TOGGLE =====
window.toggleMute = function(videoId, btnEl) {
    const video = document.getElementById(videoId);
    if (!video) return;
    
    video.muted = !video.muted;
    
    const icon = btnEl.querySelector('i');
    if (video.muted) {
        icon.className = 'fa-solid fa-volume-xmark';
        btnEl.setAttribute('title', 'Unmute Video');
    } else {
        icon.className = 'fa-solid fa-volume-high';
        btnEl.setAttribute('title', 'Mute Video');
    }
};
