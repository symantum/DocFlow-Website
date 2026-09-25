/** Shown after public forms so applicants look in Spam/Junk for support@. */
export function InboxHint({ verify = false }: { verify?: boolean }) {
  return (
    <p className="text-sm text-slate-600 leading-relaxed font-medium max-w-md mx-auto">
      {verify
        ? 'Look for a message from support@symantum.com with a verify link. Check Inbox, Spam, and Junk, then mark it as not spam so later DocFlow mail is delivered.'
        : 'Replies come from support@symantum.com. Check Inbox, Spam, and Junk if you do not see it.'}
    </p>
  )
}
