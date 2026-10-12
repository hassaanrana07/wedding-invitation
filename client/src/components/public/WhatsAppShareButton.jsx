import React, { useState } from 'react';
import { Share2, Check, Copy } from 'lucide-react';
import { useWedding } from '../../context/WeddingContext';

export default function WhatsAppShareButton({ invitationToken = '', guestName = '' }) {
  const { wedding } = useWedding();
  const [copied, setCopied] = useState(false);

  const inviteUrl = invitationToken
    ? `${window.location.origin}/invite/${invitationToken}`
    : window.location.origin;

  const shareText = guestName
    ? `Dear ${guestName},\nYou are warmly invited to celebrate the Pakistani wedding ceremonies of ${wedding.couple_title || 'Rida & Harish'} ❤️\n\nView your personalized invitation card & RSVP here:\n${inviteUrl}`
    : `You are warmly invited to celebrate the wedding ceremonies of ${wedding.couple_title || 'Rida & Harish'} ❤️\n\nView the wedding invitation:\n${inviteUrl}`;

  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="inline-flex items-center gap-2">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366] hover:text-black font-semibold text-xs transition-all shadow-md"
      >
        <Share2 className="w-4 h-4" />
        <span>Share on WhatsApp</span>
      </a>

      <button
        onClick={handleCopyLink}
        className="p-2.5 rounded-full border border-gold-500/30 text-gold-300 hover:bg-gold-500/10 transition-colors text-xs"
        title="Copy Invitation Link"
      >
        {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
      </button>
    </div>
  );
}
