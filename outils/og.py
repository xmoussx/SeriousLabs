"""Fabrique les images de partage : og-fr.png et og-en.png (formation) à partir
de outils/og.html, og-accueil-fr.png et og-accueil-en.png à partir de
outils/og-accueil.html.

Usage, depuis la racine du dépôt :
    python3 -m http.server 8765 --bind 127.0.0.1 &
    python3 outils/og.py
"""
import asyncio
from playwright.async_api import async_playwright

TEXTES = {
    "fr": ("On installe.<br>Vous gardez les clés.",
           "Une journée dans vos locaux, quatre personnes au plus. Les outils restent à vous.",
           ["Lettres et courriels", "Devis et propositions", "Factures et relances",
            "Contrats et documents types", "Tableaux de bord", "Traduction"]),
    "en": ("We install.<br>You keep the keys.",
           "One day at your office, four people at most. The tools stay yours.",
           ["Letters and emails", "Quotes and proposals", "Invoices and reminders",
            "Contracts and templates", "Reporting", "Translation"]),
}

ACCUEIL = {
    "fr": ("Former, conseiller,<br>construire.",
           "Formation à l'IA pour les petites équipes, conseil aux opérateurs de jeux d'argent, et le registre de ce que Serious Labs a construit."),
    "en": ("Train, advise,<br>build.",
           "AI training for small teams, consulting for gambling operators, and the register of what Serious Labs has built."),
}

async def main():
    async with async_playwright() as pw:
        b = await pw.chromium.launch()
        p = await b.new_page(viewport={"width": 1200, "height": 630})
        for lang, (titre, phrase, cles) in TEXTES.items():
            await p.goto("http://127.0.0.1:8765/outils/og.html", wait_until="networkidle")
            await p.evaluate("""([t, ph, k]) => {
                document.querySelector('[data-t]').innerHTML = t;
                document.querySelector('[data-p]').textContent = ph;
                document.querySelectorAll('[data-k]').forEach((e, i) => e.textContent = k[i]);
            }""", [titre, phrase, cles])
            await p.evaluate("document.fonts.ready")
            await p.wait_for_timeout(1500)
            await p.screenshot(path=f"assets/img/og-{lang}.png")
        for lang, (titre, phrase) in ACCUEIL.items():
            await p.goto("http://127.0.0.1:8765/outils/og-accueil.html", wait_until="networkidle")
            await p.evaluate("""([t, ph]) => {
                document.querySelector('[data-t]').innerHTML = t;
                document.querySelector('[data-p]').textContent = ph;
            }""", [titre, phrase])
            await p.evaluate("document.fonts.ready")
            await p.wait_for_timeout(1500)
            await p.screenshot(path=f"assets/img/og-accueil-{lang}.png")
        await b.close()

asyncio.run(main())
