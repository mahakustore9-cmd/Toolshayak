import { ToolItem } from "../types";

export const TOOLS: ToolItem[] = [
  {
    id: "jpg-to-pdf",
    slug: "jpg-to-pdf",
    name: "JPG to PDF Converter",
    category: "pdf",
    isPopular: true,
    metaTitle: "JPG to PDF Converter Free Online (No Limits)",
    metaDescription: "Convert multiple JPG, PNG, and WebP photos into a clean PDF online for free. Adjust margins, page orientation, and reorder pages client-side.",
    shortDescription: "Convert multiple JPG, PNG, and WebP images into a single neat PDF file.",
    longDescription: "Turn gallery photos, scanned receipts, documents, and Aadhaar/PAN cards into a clean, multi-page PDF document. Rearrange pages, pick A4 or Letter sizes, and download directly without uploading to external servers.",
    howToUse: [
      "Click 'Select Photos' or drag and drop your images into the upload area.",
      "Rearrange image order by moving cards left or right, or remove any mistakes.",
      "Choose page orientation (Portrait or Landscape) and standard page format (A4, Letter, or Fit).",
      "Click 'Convert & Download PDF' to instantly save your converted PDF file."
    ],
    features: [
      "100% Client-Side Processing: Your confidential photos never leave your device.",
      "Batch Image Support: Combine unlimited JPG, PNG, and WebP images into one PDF.",
      "Standard A4 & Letter sizes matching international and Indian government portal standards.",
      "Instant high-speed conversion directly in browser memory."
    ],
    faqs: [
      {
        question: "Is this JPG to PDF converter completely free?",
        answer: "Yes, it is 100% free forever with no watermarks, no usage limits, and no registration required."
      },
      {
        question: "Are my uploaded photos secure and private?",
        answer: "Yes! All processing happens entirely inside your web browser. Your photos are never sent to or stored on any server."
      },
      {
        question: "Can I combine images of different dimensions?",
        answer: "Yes. You can choose 'Fit to Page' or standard A4 formatting so all images fit neatly on PDF pages."
      }
    ]
  },
  {
    id: "pdf-to-jpg",
    slug: "pdf-to-jpg",
    name: "PDF to JPG Converter",
    category: "pdf",
    isPopular: true,
    metaTitle: "PDF to JPG Converter Online - Extract PDF Pages as Images",
    metaDescription: "Convert PDF pages into high-resolution JPG images directly in your browser. Download single pages or all pages as a ZIP file.",
    shortDescription: "Extract every page of your PDF into high-quality JPG image files.",
    longDescription: "Easily convert any PDF document pages into crisp JPG images. Perfect for sharing document screenshots, uploading forms to job portals, or extracting certificates.",
    howToUse: [
      "Click the upload box to select your PDF document.",
      "ToolSahayak will instantly render all pages as image thumbnails.",
      "Click 'Download Page JPG' on any individual page or 'Download All Pages (.ZIP)' to get all pages."
    ],
    features: [
      "High-resolution canvas rendering for sharp, readable text.",
      "Download individual page JPGs or all pages in a single ZIP file.",
      "Works 100% locally with zero server file transfers.",
      "No file size limits imposed by arbitrary server quotas."
    ],
    faqs: [
      {
        question: "How many pages can I extract?",
        answer: "You can extract all pages in your document. There is no artificial page limit."
      },
      {
        question: "Can I download all pages together?",
        answer: "Yes, click 'Download All Pages (.ZIP)' to receive a zip archive containing all high-resolution JPGs."
      }
    ]
  },
  {
    id: "pdf-compressor",
    slug: "pdf-compressor",
    name: "PDF Compressor",
    category: "pdf",
    isPopular: true,
    metaTitle: "Compress PDF Online - Reduce PDF File Size (KB/MB)",
    metaDescription: "Reduce PDF document size for job portals, email attachments, and government application uploads. Choose Low, Medium, or High compression.",
    shortDescription: "Shrink large PDF documents to under 1 MB or 200 KB for government & job portals.",
    longDescription: "Reduce the file size of your PDF documents while keeping text readable and legible. Choose between Low, Medium (Recommended), and High compression levels.",
    howToUse: [
      "Select the PDF file you wish to compress.",
      "Choose your desired compression strength: Low (Quality), Medium (Recommended), or High (Max Shrink).",
      "Click 'Compress PDF Now' and review original vs compressed file size.",
      "Download your optimized PDF file with one click."
    ],
    features: [
      "Smart image resampler and vector stream reconstructor.",
      "Live file size reduction display showing exact bytes saved.",
      "100% private: Medical records, bank statements, and ID proofs are never sent across the internet.",
      "Fast client-side execution on any mobile or desktop browser."
    ],
    faqs: [
      {
        question: "Will text become unreadable after compression?",
        answer: "Our balanced compression algorithm maintains high visual readability for text, seals, and signatures while minimizing size."
      },
      {
        question: "Is there any danger of private documents leaking?",
        answer: "No. The entire optimization runs locally in your device's memory. No data is transmitted to external servers."
      }
    ]
  },
  {
    id: "image-compressor",
    slug: "image-compressor",
    name: "Image Compressor",
    category: "image",
    isPopular: true,
    metaTitle: "Image Compressor Online - Reduce JPG, PNG & WebP (KB)",
    metaDescription: "Compress photos and scanned signatures to under 100 KB, 50 KB, or 20 KB for UPSC, SSC, and state exams. Batch mode with quality slider.",
    shortDescription: "Compress photos and signatures to under 100 KB, 50 KB, or 20 KB easily.",
    longDescription: "Quickly compress single or multiple JPG, PNG, and WebP images. Use interactive quality sliders or quick presets (Under 50 KB, Balanced, High Quality) to meet strict portal limits.",
    howToUse: [
      "Select one or multiple images from your device.",
      "Adjust the target quality slider or choose a quick preset (e.g. Under 50KB).",
      "Inspect before and after file sizes and savings percentage.",
      "Download individual images or download all as a ZIP archive."
    ],
    features: [
      "Batch mode: Compress dozens of photos simultaneously.",
      "Real-time visual comparison and exact KB counter.",
      "Preserves original dimensions while intelligently reducing file footprint.",
      "Download all compressed photos in one ZIP archive."
    ],
    faqs: [
      {
        question: "How do I compress a photo to under 50 KB for an exam form?",
        answer: "Upload your photo and click the 'Under 50KB (45%)' preset button. The compressed size is immediately calculated for you."
      },
      {
        question: "Does it work with PNG and WebP files?",
        answer: "Yes, it supports JPG, JPEG, PNG, and WebP format images."
      }
    ]
  },
  {
    id: "image-resizer",
    slug: "image-resizer",
    name: "Image Resizer & Passport Photo",
    category: "image",
    isPopular: true,
    metaTitle: "Image Resizer Online - Passport, PAN Card & Custom Dimensions",
    metaDescription: "Resize photos by pixel dimensions or standard Indian passport (3.5x4.5 cm), PAN card, SSC, UPSC, and YouTube thumbnail presets.",
    shortDescription: "Resize photos for Indian Passport (3.5x4.5 cm), PAN Card, SSC, UPSC & Social Media.",
    longDescription: "Set custom width and height in pixels or choose from official presets for Indian Passport, PAN Card signature, SSC/UPSC online registration forms, YouTube thumbnails, and Instagram posts.",
    howToUse: [
      "Upload your photo or signature scan.",
      "Select an official preset (e.g., Indian Passport 3.5×4.5 cm) or type custom width and height.",
      "Toggle Aspect Ratio Lock as needed and select output format (JPG, PNG, WebP).",
      "Click 'Apply & Preview Resized Photo' and download your perfectly dimensioned image."
    ],
    features: [
      "Official presets for Indian Passport, PAN Card photo/signature, SSC, and UPSC exams.",
      "Social media dimensions for YouTube, Instagram, WhatsApp DP, and Facebook.",
      "High-quality bicubic canvas interpolation for smooth edges.",
      "Format conversion between JPG, PNG, and WebP."
    ],
    faqs: [
      {
        question: "What is the standard pixel size for Indian Passport photo?",
        answer: "Standard Indian Passport photo (3.5 x 4.5 cm) is typically 350 x 450 pixels or 413 x 531 pixels at 300 DPI."
      },
      {
        question: "What are PAN Card signature dimensions?",
        answer: "PAN card online portals typically require 400 x 200 pixels or 200 x 100 pixels under 20 KB."
      }
    ]
  },
  {
    id: "qr-code-generator",
    slug: "qr-code-generator",
    name: "QR Code Generator (UPI, URL, WiFi)",
    category: "qr",
    isPopular: true,
    metaTitle: "Free QR Code Generator - UPI Payment, WiFi, Website & Text",
    metaDescription: "Create free custom QR codes for UPI payments (Google Pay, PhonePe, Paytm), WiFi passwords, websites, and business cards with custom colors.",
    shortDescription: "Generate customized QR codes for UPI payments, WiFi passwords, and websites.",
    longDescription: "Create free, permanent QR codes with customized colors, high resolution, and error correction. Perfect for shop UPI payment stands, home WiFi sharing, and marketing flyers.",
    howToUse: [
      "Select QR type: Website URL, UPI Payment, WiFi Network, Phone, Email, or Plain Text.",
      "Enter your details (e.g. your UPI ID, WiFi name and password, or URL).",
      "Customize foreground/background colors and resolution (up to 1000px HD).",
      "Download high-resolution PNG or copy the image directly to your clipboard."
    ],
    features: [
      "Direct UPI payment string support compatible with Google Pay, PhonePe, Paytm, and BHIM.",
      "One-scan WiFi QR connection (WPA/WPA2/Open).",
      "High Definition export up to 1000x1000 px for print banners and shop counters.",
      "Static QR codes: Never expire, no monthly fees, no scanning limits."
    ],
    faqs: [
      {
        question: "Do these QR codes expire?",
        answer: "No! All generated QR codes are static and will work forever without expiration."
      },
      {
        question: "Can customers pay me using any UPI app with this QR?",
        answer: "Yes, standard UPI QR codes work across PhonePe, Google Pay, Paytm, Amazon Pay, and BHIM."
      }
    ]
  },
  {
    id: "qr-code-scanner",
    slug: "qr-code-scanner",
    name: "QR Code Scanner (Camera & Upload)",
    category: "qr",
    isPopular: false,
    metaTitle: "Online QR Code Scanner - Web Camera & Screenshot Upload",
    metaDescription: "Scan QR codes using your phone/laptop webcam or by uploading a saved screenshot or photo. Decodes links, UPI VPAs, and text instantly.",
    shortDescription: "Scan QR codes instantly using your device camera or by uploading a screenshot.",
    longDescription: "Point your device camera at any QR code or upload a screenshot to instantly decode the hidden link, UPI payment ID, WiFi network credentials, or text message.",
    howToUse: [
      "Choose 'Live Camera Scan' and grant camera permission, or switch to 'Upload QR Image'.",
      "Align the QR code within the viewfinder box.",
      "The decoded content will appear immediately with instant 'Copy' and 'Open Link' actions."
    ],
    features: [
      "Dual mode: High-speed live camera scanning or image file upload.",
      "Automatic URL detection with one-click direct browser opening.",
      "100% private: Video stream and scanned images are processed locally on your hardware.",
      "Supports all standard QR formats."
    ],
    faqs: [
      {
        question: "Why does the scanner ask for camera permission?",
        answer: "Camera access is needed solely to read the QR pattern in real time. Frames are never recorded or transmitted."
      },
      {
        question: "Can I scan a QR code from a gallery photo or screenshot?",
        answer: "Yes! Simply click the 'Upload QR Image / Screenshot' tab and select your photo."
      }
    ]
  },
  {
    id: "word-counter",
    slug: "word-counter",
    name: "Word & Character Counter",
    category: "calculator",
    isPopular: false,
    metaTitle: "Word Counter Online - Character, Sentence & Reading Time Calculator",
    metaDescription: "Accurate online word counter with character count, paragraphs, sentences, estimated reading time, and text case conversion tools.",
    shortDescription: "Count words, characters, sentences, paragraphs, and estimated reading time live.",
    longDescription: "Get comprehensive text statistics including total words, characters with/without spaces, sentences, paragraphs, and average reading & speaking times. Includes quick case converter buttons.",
    howToUse: [
      "Type or paste your text into the input area.",
      "Metrics update live in real time as you type.",
      "Use case formatting buttons (UPPERCASE, lowercase, Title Case) or click 'Copy Text'."
    ],
    features: [
      "Real-time live counting with zero delay.",
      "Breakdown of characters with spaces vs without spaces.",
      "Estimated reading time (at 200 WPM) and speaking time (at 130 WPM).",
      "One-click case conversion (UPPERCASE, lowercase, Title Case)."
    ],
    faqs: [
      {
        question: "Is there a word or character limit?",
        answer: "No, you can paste full essays, research papers, blog posts, or book chapters."
      }
    ]
  },
  {
    id: "percentage-calculator",
    slug: "percentage-calculator",
    name: "Percentage Calculator (5-in-1)",
    category: "calculator",
    isPopular: true,
    metaTitle: "Percentage Calculator Online - Exam Marks, Discounts & % Change",
    metaDescription: "Calculate 'What is X% of Y', exam marks percentage, percentage increase/decrease, shopping discounts, and profit margins with clear formulas.",
    shortDescription: "Calculate percentages, exam marks, discount prices, percentage change, and profit/loss.",
    longDescription: "A versatile 5-in-1 percentage math toolkit: Calculate X% of Y, calculate marks percentage (e.g. 450 out of 600), percentage change/growth, shopping discount final prices, and profit/loss margins.",
    howToUse: [
      "Select your calculation mode from the top tabs (e.g. Marks %, Discount, % Change).",
      "Enter your numbers in the input boxes.",
      "View the calculated result immediately along with the exact mathematical formula used."
    ],
    features: [
      "5 practical modes: X% of Y, Marks Percentage, Growth/Decline, Discount, Profit/Loss.",
      "Step-by-step formula breakdown shown for students and exam practice.",
      "One-click answer copy button.",
      "Handles decimals and large numerical inputs accurately."
    ],
    faqs: [
      {
        question: "How do I calculate my exam marks percentage?",
        answer: "Click the 'X is what % of Y? (Marks)' tab, enter your obtained marks in X (e.g. 450) and total marks in Y (e.g. 600)."
      },
      {
        question: "How does the discount calculator work?",
        answer: "Enter the original item price and discount percentage (e.g. 30% off) to see exact rupees saved and the final amount you pay."
      }
    ]
  },
  {
    id: "age-calculator",
    slug: "age-calculator",
    name: "Age Calculator (Exact DOB to Today)",
    category: "calculator",
    isPopular: true,
    metaTitle: "Age Calculator by Date of Birth - Exact Years, Months & Days",
    metaDescription: "Calculate your exact age in years, months, days, hours, and minutes. See next birthday countdown, day of birth, and zodiac sign.",
    shortDescription: "Calculate exact age in years, months, and days with next birthday countdown.",
    longDescription: "Calculate your precise age from date of birth to today or any specific cut-off date (ideal for government exam eligibility). Shows lifetime totals in months, weeks, days, minutes, plus next birthday countdown and zodiac sign.",
    howToUse: [
      "Select your Date of Birth (DOB) using the date picker.",
      "Optionally change the 'Age at date of' to an exam cut-off date (defaults to today).",
      "Click 'Calculate Exact Age' to view your detailed age card and lifetime statistics."
    ],
    features: [
      "Accurate leap-year and varying month-length calculation.",
      "Age at custom date feature for SSC, UPSC, IBPS, and State PSC cut-off criteria.",
      "Next birthday countdown showing days remaining and weekday name.",
      "Astrological zodiac sign and weekday of birth information."
    ],
    faqs: [
      {
        question: "Can I check my age for government exam eligibility?",
        answer: "Yes! Simply set the 'Age at Date Of' field to the exam's notification cut-off date (e.g. 01/01/2026)."
      },
      {
        question: "Does this calculator account for leap years?",
        answer: "Yes, our algorithm accurately calculates exact days taking leap years into account."
      }
    ]
  }
];
