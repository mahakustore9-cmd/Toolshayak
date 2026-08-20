import { GuideItem } from "../types";

export const GUIDES: GuideItem[] = [
  {
    id: "how-to-resize-photo-for-exam-forms",
    slug: "how-to-resize-photo-for-exam-forms",
    title: "How to Resize Photo & Signature for SSC, UPSC & Govt Exam Forms",
    category: "Image Guide",
    summary: "Complete step-by-step guide to resizing passport photos (3.5x4.5 cm) and signature scans to under 50 KB and 20 KB without computer software.",
    readTime: "4 min read",
    publishedDate: "Feb 2026",
    relatedToolSlugs: ["image-resizer", "image-compressor"],
    sections: [
      {
        heading: "Understanding Govt Exam Photo Specifications",
        content: "Most major Indian recruitment boards (like SSC CGL/CHSL, UPSC Civil Services, IBPS Bank PO, and State PSCs) reject application forms if the uploaded photo exceeds 50 KB or does not match official 3.5 x 4.5 cm proportions. Signatures are strictly required to be under 20 KB and dimensioned around 400 x 200 pixels."
      },
      {
        heading: "Step 1: Crop and Set Exact Dimensions",
        content: "Open our free Image Resizer tool. Upload your photo and choose the 'Indian Passport Photo (3.5 × 4.5 cm)' or 'PAN / SSC Signature (400 × 200 px)' preset. The tool will automatically scale your photo to precise government dimensions."
      },
      {
        heading: "Step 2: Compress Under 50 KB or 20 KB",
        content: "If the output file size is still above the portal limit, switch to our Image Compressor tool. Select the 'Under 50KB' or 'Under 20KB' quality preset. The image will be compressed with zero pixelation and 100% sharp clarity."
      },
      {
        heading: "Step 3: Verification Before Uploading",
        content: "Check that your face occupies at least 70–80% of the passport photo frame against a light or white background. Ensure no glare on eyeglasses, and that both ears are visible."
      }
    ],
    faqs: [
      {
        question: "What is the standard pixel size for SSC and UPSC photos?",
        answer: "Standard dimensions are 138 x 177 pixels or 350 x 450 pixels at 300 DPI, between 20 KB and 50 KB."
      },
      {
        question: "Can I resize my photo on an Android phone?",
        answer: "Yes! ToolSahayak works seamlessly in Chrome and Safari mobile browsers without installing any mobile application."
      }
    ]
  },
  {
    id: "how-to-compress-pdf-under-200kb",
    slug: "how-to-compress-pdf-under-200kb",
    title: "How to Compress PDF to Under 200 KB or 1 MB for Email & Portals",
    category: "PDF Guide",
    summary: "Learn how to reduce large multi-page PDF document sizes for admission portals, job applications, and WhatsApp sharing safely in your browser.",
    readTime: "3 min read",
    publishedDate: "Feb 2026",
    relatedToolSlugs: ["pdf-compressor", "jpg-to-pdf"],
    sections: [
      {
        heading: "Why Do Portals Require Small PDF Files?",
        content: "College admission websites, passport portals, and recruitment portals process millions of candidate uploads. To conserve server storage and bandwidth, they enforce strict file limits (typically between 100 KB and 1 MB)."
      },
      {
        heading: "How to Compress Safely Without Leaking Private Data",
        content: "Many commercial websites upload your sensitive marksheets, Aadhaar cards, and income certificates to overseas cloud servers. ToolSahayak processes and recompresses PDF image streams directly inside your browser hardware, guaranteeing zero data leakage."
      },
      {
        heading: "Steps to Reduce PDF Size",
        content: "1. Open ToolSahayak PDF Compressor. 2. Select your PDF document. 3. Select 'Medium' or 'High' compression strength. 4. Click Compress and download your optimized PDF."
      }
    ],
    faqs: [
      {
        question: "Will compressing a PDF make the text unreadable?",
        answer: "Our balanced compression resamples images while keeping text streams intact and razor sharp."
      }
    ]
  },
  {
    id: "how-to-create-upi-payment-qr-code",
    slug: "how-to-create-upi-payment-qr-code",
    title: "How to Create a Custom UPI Payment QR Code for Your Shop or Business",
    category: "QR Guide",
    summary: "Create a permanent, free UPI payment QR code for Google Pay, PhonePe, and Paytm that never expires and requires no transaction fees.",
    readTime: "3 min read",
    publishedDate: "Feb 2026",
    relatedToolSlugs: ["qr-code-generator", "qr-code-scanner"],
    sections: [
      {
        heading: "What is a Static UPI QR Code?",
        content: "A static UPI QR code encodes a standard 'upi://pay' payment string that works universally across Google Pay, PhonePe, Paytm, Amazon Pay, and BHIM UPI. Customers scan the QR code and your UPI ID is automatically filled in."
      },
      {
        heading: "How to Generate Your Shop QR Code",
        content: "1. Open the QR Code Generator and click 'UPI / Payment QR'. 2. Enter your UPI ID (e.g. yourname@okhdfcbank or mobilenumber@paytm). 3. Enter your shop or personal name. 4. Choose high resolution (1000px HD) and download the PNG for printing."
      },
      {
        heading: "Printing and Displaying Your QR Code",
        content: "Print the downloaded 1000px HD image and place it on your checkout counter or billing invoices. Because it is a static QR code, it will never expire or require recurring fees."
      }
    ],
    faqs: [
      {
        question: "Do I have to pay any fees or commissions for using this QR code?",
        answer: "No. ToolSahayak creates direct peer-to-peer static UPI QR codes. 100% of customer payments go directly to your linked bank account."
      }
    ]
  }
];
