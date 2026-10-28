/* eslint-disable */
// Wires the contact form: posts to /api/contact, reports plainly, and falls back to the phone
// and email if the route isn't configured yet.
export function wireContactForm() {
  var form = document.getElementById('form'), note = document.getElementById('formnote');
  if (!form || !note) return;
  var original = note.textContent;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var data = { name: form.name.value, email: form.email.value, situation: form.situation.value, company: form.company ? form.company.value : '' };
    var btn = form.querySelector('button[type=submit]');
    if (btn) btn.disabled = true; note.textContent = 'Sending…';
    fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
      .then(function (r) { return r.json().then(function (j) { return { s: r.status, j: j }; }); })
      .then(function (res) {
        if (res.j && res.j.ok) { note.textContent = 'Thank you. A partner will reply within one business day.'; form.reset(); }
        else if (res.s === 422) { note.textContent = 'Please add your name, a valid email and a line about the situation.'; }
        else { note.textContent = 'The form isn’t connected yet. Please call +1 (000) 000-0000 or email contact@acg-domain.com.'; }
      })
      .catch(function () { note.textContent = 'Something went wrong. Please call +1 (000) 000-0000 or email contact@acg-domain.com.'; })
      .then(function () { if (btn) btn.disabled = false; });
  });
}
