'use client';

import { Mail, Linkedin, Instagram } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-gray-100 py-3 border-t border-gray-200 z-50">
      <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-800">
        <Link
          href="https://instagram.com/mkauffit"
          target="_blank"
          className="flex items-center gap-2 hover:text-pink-500 transition-colors"
        >
          <Instagram size={16} className="text-pink-500" />
          <span>Follow on Instagram</span>
        </Link>

        <Link
          href="https://linkedin.com/in/mkauffit"
          target="_blank"
          className="flex items-center gap-2 hover:text-blue-600 transition-colors"
        >
          <Linkedin size={16} className="text-blue-600" />
          <span>Connect on LinkedIn</span>
        </Link>

        <a
          href="mailto:mkauffit@gmail.com"
          className="flex items-center gap-2 hover:text-black transition-colors"
        >
          <Mail size={16} className="text-black" />
          <span>
            Email Me: <span className="font-medium">mkauffit@gmail.com</span>
          </span>
        </a>
      </div>
    </footer>
  );
}
