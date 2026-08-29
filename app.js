/* Historia Magistra — router, data, views */
const D = { works: [], texts: {} };
const view = document.getElementById("view");

const esc = s => String(s ?? "").replace(/[&<>"']/g, m =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));
const el = h => { const t = document.createElement("template"); t.innerHTML = h.trim(); return t.content.firstElementChild; };
const LINIE = { state: "The statecraft line", trade: "The trade line", strat: "The strategy line" };
const LCOLOR = { state: "var(--state)", trade: "var(--trade)", strat: "var(--strat)" };
const workById = id => D.works.find(w => w.id === id);
const citeOf = (w, sec, u) => `${sec.cite} [${u.k}]`;

/* --------------------------------------------------------------- boot */
async function boot() {
  D.works = await fetch("data/works.json").then(r => r.json());
  const res = await Promise.all(D.works.map(w => fetch(`data/${w.id}.json`).then(r => r.json())));
  D.works.forEach((w, i) => D.texts[w.id] = res[i]);
  window.addEventListener("hashchange", route);
  route();
}
const ROUTES = {};
function route() {
  const h = (location.hash || "#/overview").slice(2).split("/");
  const name = h[0] || "overview";
  document.querySelectorAll("#nav a").forEach(a => a.classList.toggle("active", a.dataset.v === name));
  if (atlasStop) { atlasStop(); atlasStop = null; }
  view.innerHTML = ""; window.scrollTo(0, 0);
  (ROUTES[name] || viewOverview)(h.slice(1));
}

/* ============================================================ OVERVIEW */
function viewOverview() {
  view.append(el(`<div>
    <div class="viewhead">
      <span class="tag">Research apparatus · executive curriculum</span>
      <h1>The questions on the C-suite agenda are older than the corporation</h1>
      <p class="lede">How rivals escalate; when to fight and when to settle; how trade becomes a weapon
      and a dependency; why execution diverges from plan; what a leader owes the led. Before there were
      business schools these questions were worked out — often at the cost of cities — by historians,
      jurists, merchants and soldiers whose books are now free of copyright and mostly unread. This site
      is a curated apparatus of twelve such texts, from Thucydides to Mackinder, in citable public-domain
      editions: each with a scholarly headnote, exact excerpts with paragraph-level anchors, and an
      executive lens connecting it to current management challenges — plus bridges to two live tools for
      applying the past to the present.</p>
    </div>

    <div class="grid g3">
      <div class="card linie-state">
        <h3>The statecraft line</h3>
        <p class="fine">Power, rivalry, institutions, leadership</p>
        <p>Thucydides · Kautilya · Machiavelli · Bacon · Hobbes — the analysis of competition among
        organized powers: escalation dynamics, competitor geometry, early warning, change, trust and
        enforcement.</p>
      </div>
      <div class="card linie-trade">
        <h3>The trade line</h3>
        <p class="fine">The first globalization and its arguments</p>
        <p>Grotius · Mun · Smith — the founding debate about open trade and economic power, written
        when chartered companies were inventing the multinational: free access versus the balance of
        trade, efficiency versus security.</p>
      </div>
      <div class="card linie-strat">
        <h3>The strategy line</h3>
        <p class="fine">Competition under uncertainty</p>
        <p>Sun Tzŭ · Clausewitz · Mahan · Mackinder — strategy as calculation, friction and geography:
        winning without fighting, executing through fog, controlling the commons, and the closed world
        system.</p>
      </div>
    </div>

    <h2>The corpus</h2>
    <div class="grid g2" id="ov-works"></div>

    <h2>From the sources to the present</h2>
    <div class="grid g2">
      <div class="card">
        <h3>Executive concordance</h3>
        <p>Eight current leadership challenges — escalation, sensing, change, interdependence, execution
        and more — each mapped to the exact passages across the corpus that speak to it.
        <a href="#/concordance">Open the concordance →</a></p>
      </div>
      <div class="card">
        <h3>Atlas</h3>
        <p>A conceptual map of the corpus: its leading terms — war, power, trade, law, sea — linked
        where they occur in the same passage, coloured by line. Click any term to see how twelve
        works across 2,300 years share one vocabulary. <a href="#/atlas">Open the atlas →</a></p>
      </div>
      <div class="card">
        <h3>Applications</h3>
        <p>Two companion tools apply this way of reading to live events: a daily source-based monitor of
        Russia's war against Ukraine, and an interactive engine that proposes — and stress-tests —
        historical analogies for any current conflict. <a href="#/applications">See the applications →</a></p>
      </div>
    </div>

    <p class="fine" style="margin-top:2rem">New here? Read the <a href="#/introduction">introduction</a>
    first: why these twelve texts, what 'lessons from the past' can and cannot mean, and how to use
    historical analogy without being used by it. Sources, editions and rights are on the
    <a href="#/method">method page</a>.</p>
  </div>`));
  const grid = view.querySelector("#ov-works");
  D.works.forEach(w => {
    const c = el(`<div class="card workcard linie-${w.line}">
      <p class="fine" style="margin:0">${esc(w.author)} · ${esc(w.date)}</p>
      <h3 style="margin:.2rem 0 .4rem">${esc(w.title)}</h3>
      <p style="margin:0;font-size:.95rem;color:var(--fg2)">${esc(w.blurb)}</p>
    </div>`);
    c.onclick = () => location.hash = `#/work/${w.id}`;
    grid.append(c);
  });
}

/* ======================================================== INTRODUCTION */
function viewIntroduction() {
  view.append(el(`<div class="essay">
    <div class="viewhead">
      <span class="tag">Introduction</span>
      <h1>Lessons from the past, taken seriously</h1>
      <p class="lede">Why a leadership site built on texts written between the fifth century BC and
      1904 — and how to use them without fooling yourself.</p>
    </div>

    <h2>1. Historia magistra vitae — a claim on probation</h2>
    <p class="readable">Cicero called history "the witness of the times, the light of truth, the life
    of memory, the teacher of life" — <em>historia magistra vitae</em> (De oratore II.36). For two
    thousand years that topos justified reading old books for present guidance. Modern historians have
    treated it more roughly: Reinhart Koselleck argued that the topos quietly died around 1800, when
    Europeans began to experience the future as structurally unlike the past — a condition of
    accelerating novelty in which precedent loses authority. Every executive who has been told that
    "this time is different" — about a technology, a market, a war — stands inside that argument.</p>
    <p class="readable">This site takes a middle position, which is also the oldest one. Thucydides
    claimed his history would be useful not because events repeat, but because "the nature of mankind
    remains the same," so that situations of like structure will recur in recognizable form (cf.
    <a href="#/work/thucydides/iii82/1">Thuc. III.82 [1]</a>). What history teaches is not answers but
    structures: escalation spirals, commitment problems, principal–agent decay, the political economy
    of protection, the epistemics of acting on bad information. Those recur because the constraints
    that generate them — scarcity, rivalry, uncertainty, and human cognition — recur. The texts
    collected here earned their survival by describing such structures at a depth their successors
    have refined but not replaced.</p>

    <h2>2. Why the early modern moment speaks to this one</h2>
    <p class="readable">The corpus is anchored (though not confined) to the long early modern period —
    roughly Machiavelli to Smith — for a reason that goes beyond copyright convenience. That period
    produced the <em>first globalization</em>: between Vasco da Gama's arrival in India (1498) and the
    Navigation Acts, Europe's trading states wove the first commercial system of genuinely planetary
    scope. Its instruments are uncannily familiar. The Dutch East India Company (1602) pioneered
    permanent capital and freely tradable shares — the operating system of the modern corporation —
    while functioning as a state-like actor with fleets and treaties; its English rival employed
    Thomas Mun, whose defence of the firm's bullion exports became the classic theory of the trade
    balance. Grotius's <em>Mare Liberum</em>, the founding text of the open commercial order, was
    commissioned as legal advocacy for that same Dutch company. The seventeenth century, in short, is
    where the corporation, the trade war, economic statecraft, and the rules-based order were invented
    together — usually in the same buildings.</p>
    <p class="readable">The resonance with the present is structural, not decorative. Then as now:
    a rising commercial power challenged an incumbent's control of trade routes; access to commons
    (sea lanes then; also cables, chips and payment rails now) was contested by legal argument backed
    by force; states treated commerce as a component of power and merchants as instruments of policy;
    and companies discovered that they were not spectators of geopolitics but participants in it. A
    C-level reader navigating export controls, chokepoint risk, friend-shoring and sanctions is working
    problems whose grammar was fixed between 1600 and 1776. The military-strategy line extends the
    same logic to competition's sharpest edge — where the costs of self-deception are highest and the
    writing, accordingly, most honest about uncertainty, friction and information.</p>

    <h2>3. The three lines</h2>
    <p class="readable"><strong style="color:var(--state)">Statecraft.</strong> Thucydides supplies the
    dynamics of rivalry: power transitions, alliance politics, norm decay, and the most compact account
    of stakeholder leadership ever written. Kautilya contributes the ancient world's most systematic
    management text: capability audit, competitor geometry, and a sixfold menu of strategic postures.
    Machiavelli adds diagnostics — early detection, the politics of change, fortune and timing. Bacon
    compresses balance-of-power vigilance and innovation theory into aphorism. Hobbes explains why
    enforcement is the precondition of investment, and why sovereign actors live in permanent mutual
    watchfulness.</p>
    <p class="readable"><strong style="color:var(--trade)">Trade.</strong> Grotius argues open access;
    Mun argues the balance of trade; Smith demolishes Mun — and then concedes, in the corpus's most
    quietly consequential sentence, that "defence is of much more importance than opulence." The three
    together form a complete, still-running argument about efficiency versus security in which every
    modern economic-security debate takes a side, usually without knowing it.</p>
    <p class="readable"><strong style="color:var(--strat)">Strategy.</strong> Sun Tzŭ frames competition
    as calculation and positioning, with victory without fighting as its summit. Clausewitz supplies
    the epistemology of execution: friction, fog, chance, and the subordination of means to policy.
    Mahan reads infrastructure — the sea as "wide common," trade routes, chokepoints — as the substrate
    of power. Mackinder closes the corpus by announcing the closed world system: a fully claimed planet
    in which every shock re-echoes globally and rivalry shifts to relative efficiency.</p>

    <h2>4. How to use analogies without being used by them</h2>
    <p class="readable">The scholarly literature on historical analogy in decision-making is largely a
    catalogue of expensive failures: "Munich" carried the United States into Vietnam as surely as
    "another Vietnam" later paralyzed it elsewhere. Yuen Foong Khong showed that policymakers use
    analogies for real cognitive work — defining the situation, assessing stakes, evaluating options,
    predicting outcomes — but select them by surface resemblance and generational memory rather than
    structural fit. Ernest May and Richard Neustadt, teaching the same problem, proposed the working
    disciplines this site endorses:</p>
    <p class="readable">— Treat an analogy as a <em>hypothesis generator</em>, never as evidence. It
    tells you what to check, not what is true.<br>
    — Before using one, write the likenesses <em>and the differences</em> in two explicit columns; the
    differences column is where the money is.<br>
    — Separate what is <em>known</em>, <em>unclear</em>, and <em>presumed</em> about the present case
    before reaching for a precedent at all.<br>
    — Shop for multiple analogies, including at least one that points the opposite way; the first
    precedent to mind is usually the most available, not the most apt.<br>
    — Prefer structural matches (incentives, capabilities, commitment problems) to dramatic ones
    (personalities, atmospherics, moral casting).</p>
    <p class="readable">The <a href="#/applications">applications page</a> links an interactive tool
    built around exactly this protocol, and a daily monitor on which the corpus's structures can be
    watched operating in real time.</p>

    <h2>5. What this corpus is not</h2>
    <p class="readable">It is not a canon of endorsement. These texts contain, alongside their
    insight, the cruelty of the Melian dialogue's victors, the deception ethics of adversarial
    statecraft, and — in Mackinder's closing paragraph — the racial idiom of 1904, reproduced here as
    the historical document it is and flagged as such. Reading them well means extracting the geometry
    while refusing the idiom; the executive lenses attached to each work draw that boundary explicitly.
    Nor is the selection comprehensive: it is confined to works in the United States public domain,
    which excludes the twentieth-century strategic canon and every modern translation of Botero or
    Richelieu; it is light on voices outside the European tradition (Kautilya and Sun Tzŭ stand for
    much that copyright and translation history keep inaccessible); and it contains no women, an
    absence that accurately reports who was permitted to write about power before 1904. The
    <a href="#/method">method page</a> documents the selection rules, the editions, and the works
    considered and set aside.</p>
    <p class="readable">Finally, nothing here is investment, legal or policy advice. It is a reading
    apparatus: the sources, in their own words, arranged so that a working executive can consult them
    the way the tradition itself recommends — slowly, comparatively, and with the differences column
    always open.</p>

    <h2>References</h2>
    <div class="refs">
      <p>Allison, Graham. <em>Destined for War: Can America and China Escape Thucydides's Trap?</em> Boston: Houghton Mifflin Harcourt, 2017.</p>
      <p>Cicero. <em>De oratore</em> II.36 ("historia vero testis temporum, lux veritatis, vita memoriae, magistra vitae, nuntia vetustatis").</p>
      <p>Findlay, Ronald, and Kevin H. O'Rourke. <em>Power and Plenty: Trade, War, and the World Economy in the Second Millennium.</em> Princeton: Princeton University Press, 2007.</p>
      <p>Gelderblom, Oscar, Abe de Jong, and Joost Jonker. "The Formative Years of the Modern Corporation: The Dutch East India Company VOC, 1602–1623." <em>Journal of Economic History</em> 73, no. 4 (2013): 1050–1076.</p>
      <p>Jervis, Robert. <em>Perception and Misperception in International Politics.</em> Princeton: Princeton University Press, 1976.</p>
      <p>Khong, Yuen Foong. <em>Analogies at War: Korea, Munich, Dien Bien Phu, and the Vietnam Decisions of 1965.</em> Princeton: Princeton University Press, 1992.</p>
      <p>Koselleck, Reinhart. "Historia Magistra Vitae. Über die Auflösung des Topos im Horizont neuzeitlich bewegter Geschichte." In <em>Vergangene Zukunft: Zur Semantik geschichtlicher Zeiten.</em> Frankfurt am Main: Suhrkamp, 1979.</p>
      <p>May, Ernest R. <em>"Lessons" of the Past: The Use and Misuse of History in American Foreign Policy.</em> New York: Oxford University Press, 1973.</p>
      <p>Neustadt, Richard E., and Ernest R. May. <em>Thinking in Time: The Uses of History for Decision-Makers.</em> New York: Free Press, 1986.</p>
      <p>Parker, Geoffrey. <em>The Military Revolution: Military Innovation and the Rise of the West, 1500–1800.</em> Cambridge: Cambridge University Press, 1988.</p>
      <p>Stern, Philip J., and Carl Wennerlind, eds. <em>Mercantilism Reimagined: Political Economy in Early Modern Britain and Its Empire.</em> New York: Oxford University Press, 2014.</p>
      <p>van Ittersum, Martine Julia. <em>Profit and Principle: Hugo Grotius, Natural Rights Theories and the Rise of Dutch Power in the East Indies, 1595–1615.</em> Leiden: Brill, 2006.</p>
    </div>
  </div>`));
}

/* =============================================================== WORKS */
function viewWorks() {
  const wrap = el(`<div>
    <div class="viewhead">
      <span class="tag">The corpus</span>
      <h1>Twelve works, three lines</h1>
      <p class="lede">Each work opens into a reader: scholarly headnote, exact excerpts with
      paragraph-level citation anchors, and an executive lens. All texts are United States public
      domain, in the editions named on the <a href="#/method">method page</a>.</p>
    </div>
  </div>`);
  ["state", "trade", "strat"].forEach(line => {
    wrap.append(el(`<h2 style="color:${LCOLOR[line]}">${LINIE[line]}</h2>`));
    const grid = el(`<div class="grid g2"></div>`);
    D.works.filter(w => w.line === line).forEach(w => {
      const c = el(`<div class="card workcard linie-${w.line}">
        <p class="fine" style="margin:0">${esc(w.author)} · ${esc(w.date)}</p>
        <h3 style="margin:.2rem 0 .4rem">${esc(w.title)}</h3>
        <p style="margin:0 0 .5rem;font-size:.95rem;color:var(--fg2)">${esc(w.blurb)}</p>
        <p class="fine" style="margin:0">${esc(w.edition)} · cited as <span class="cite">${esc(w.abbr)}</span></p>
      </div>`);
      c.onclick = () => location.hash = `#/work/${w.id}`;
      grid.append(c);
    });
    wrap.append(grid);
  });
  view.append(wrap);
}

/* ============================================================== READER */
function viewWork(args) {
  const w = workById(args[0]);
  if (!w) { viewWorks(); return; }
  const t = D.texts[w.id];
  const idx = D.works.indexOf(w);
  const prev = D.works[idx - 1], next = D.works[idx + 1];

  const wrap = el(`<div>
    <div class="viewhead">
      <span class="tag" style="color:${LCOLOR[w.line]}">${LINIE[w.line]}</span>
      <h1>${esc(w.title)}</h1>
      <p class="lede">${esc(w.author)} · ${esc(w.date)} · ${esc(w.edition)}</p>
    </div>
    <div class="panel headnote"></div>
    <div class="toolbar">
      <input type="search" class="grow" placeholder="Search within this work…" aria-label="Search within this work">
      <span class="fine"><span class="cite">${esc(w.abbr)}</span> — click any citation chip to link to that passage</span>
    </div>
    <div class="sections"></div>
    <div class="panel execlens">
      <h2>The executive lens</h2>
    </div>
    <div class="worknav">
      <span>${prev ? `<a href="#/work/${prev.id}">← ${esc(prev.author)}</a>` : ""}</span>
      <a href="#/works">All works</a>
      <span>${next ? `<a href="#/work/${next.id}">${esc(next.author)} →</a>` : ""}</span>
    </div>
  </div>`);

  const head = wrap.querySelector(".headnote");
  t.headnote.forEach(p => head.append(el(`<p class="readable">${esc(p)}</p>`)));

  const secWrap = wrap.querySelector(".sections");
  t.sections.forEach(sec => {
    secWrap.append(el(`<h2 id="s-${esc(sec.id)}">${esc(sec.label)}</h2>`));
    sec.units.forEach(u => {
      secWrap.append(el(`<div class="unit" id="u-${esc(sec.id)}-${esc(u.k)}" data-text="${esc(u.text.toLowerCase())}">
        <p class="ulabel"><a class="cite" href="#/work/${w.id}/${esc(sec.id)}/${esc(u.k)}">${esc(citeOf(w, sec, u))}</a></p>
        <p class="readable utext"></p>
      </div>`));
      secWrap.lastElementChild.querySelector(".utext").textContent = u.text;
    });
  });

  const lens = wrap.querySelector(".execlens");
  t.exec.forEach(p => lens.append(el(`<p class="readable">${esc(p)}</p>`)));

  const search = wrap.querySelector("input[type=search]");
  search.oninput = () => {
    const q = search.value.trim().toLowerCase();
    wrap.querySelectorAll(".unit").forEach(u => {
      const hit = q && u.dataset.text.includes(q);
      u.classList.toggle("hit", !!hit);
      u.style.display = (!q || hit) ? "" : "none";
    });
    wrap.querySelectorAll("h2[id^=s-]").forEach(h => h.style.display = q ? "none" : "");
  };

  view.append(wrap);

  if (args[1] && args[2]) {
    const target = wrap.querySelector(`#u-${CSS.escape(args[1])}-${CSS.escape(args[2])}`);
    if (target) {
      target.classList.add("flash");
      setTimeout(() => target.scrollIntoView({ behavior: "smooth", block: "center" }), 60);
      setTimeout(() => target.classList.remove("flash"), 3500);
    }
  }
}

/* ========================================================= CONCORDANCE */
const THEMES = [
  {
    id: "escalation",
    title: "Rivalry and escalation",
    gloss: "Why competitive spirals start structurally — incumbent alarm at a challenger's growth, security-driven accumulation, permanent mutual surveillance — and what standing vigilance looks like.",
    ps: [
      { w: "thucydides", s: "i23", k: "1", g: "The truest cause: growth plus alarm made war inevitable" },
      { w: "hobbes", s: "c11", k: "1", g: "Power is accumulated to secure what is already held" },
      { w: "hobbes", s: "c13", k: "3", g: "Sovereign actors in the standing posture of gladiators" },
      { w: "bacon", s: "empire", k: "1", g: "Keep due sentinel; balance every gain 'straightways'" },
      { w: "mackinder", s: "pivot", k: "2", g: "The combination that must not form: pivot plus margin" }
    ]
  },
  {
    id: "wwf",
    title: "Winning without fighting",
    gloss: "The economics of avoided contests: pre-emption by calculation and position, settlements matched to relative strength, and the price of merely postponing a fight.",
    ps: [
      { w: "suntzu", s: "c3", k: "1-2", g: "Supreme excellence: breaking resistance without fighting" },
      { w: "suntzu", s: "c1", k: "26", g: "Contests are decided by calculations made in the temple" },
      { w: "kautilya", s: "b7c1", k: "2", g: "Six postures, each keyed to relative strength" },
      { w: "machiavelli", s: "c3", k: "2", g: "War avoided is often war deferred to another's advantage" }
    ]
  },
  {
    id: "sensing",
    title: "Early warning and intelligence",
    gloss: "The detection asymmetry — dangers curable while invisible, incurable once obvious — and the discipline of foreknowledge gathered from people rather than wishes.",
    ps: [
      { w: "machiavelli", s: "c3", k: "1", g: "The hectic fever: easy to cure, hard to detect" },
      { w: "suntzu", s: "c13", k: "4-6", g: "Foreknowledge comes only from other men" },
      { w: "suntzu", s: "c13", k: "7-8", g: "The intelligence system as the sovereign's most precious faculty" },
      { w: "bacon", s: "empire", k: "1", g: "Monitoring as a standing function of 'standing counsels'" },
      { w: "clausewitz", s: "c3", k: "2", g: "Most incoming information is contradictory or false" }
    ]
  },
  {
    id: "change",
    title: "Leading change",
    gloss: "Why transformations stall — concentrated losers, lukewarm winners, the drag of custom — and why leaders repeat the style that once made them successful after the times have changed.",
    ps: [
      { w: "machiavelli", s: "c6", k: "1", g: "The innovator's enemies are all who did well under the old order" },
      { w: "bacon", s: "innovations", k: "2", g: "Old arrangements are 'confederate within themselves'" },
      { w: "bacon", s: "innovations", k: "3", g: "Innovate greatly but quietly, by degrees scarce perceived" },
      { w: "machiavelli", s: "c25", k: "2", g: "The prosperous cannot be persuaded to leave their old way" }
    ]
  },
  {
    id: "interdependence",
    title: "Trade, interdependence and chokepoints",
    gloss: "The permanent argument between open access and economic security — and the physical and institutional commons, with their well-worn paths, on which every global business depends.",
    ps: [
      { w: "grotius", s: "c1", k: "2", g: "Regions differ by design; therefore exchange, therefore access" },
      { w: "mun", s: "c2", k: "1", g: "The balance-of-trade rule in its original form" },
      { w: "smith", s: "iv3", k: "2", g: "Zero-sum doctrine turns commerce into a source of discord" },
      { w: "smith", s: "iv2", k: "3", g: "Defence, however, is of much more importance than opulence" },
      { w: "mahan", s: "common", k: "1", g: "The wide common and its trade routes" },
      { w: "mackinder", s: "closed", k: "1", g: "In a closed system every shock re-echoes globally" }
    ]
  },
  {
    id: "rules",
    title: "Rules, trust and enforcement",
    gloss: "Agreements are priced by their enforcement mechanisms; norms are capital that the strong can spend but not easily rebuild; language decay is the leading indicator of institutional decay.",
    ps: [
      { w: "hobbes", s: "c17", k: "1", g: "Covenants without the sword are but words" },
      { w: "thucydides", s: "melian", k: "90", g: "The weak defend the 'common protection' the strong will one day need" },
      { w: "thucydides", s: "iii82", k: "2", g: "Words change their meanings first" },
      { w: "grotius", s: "c13", k: "1", g: "Rights persist only where someone maintains them" },
      { w: "hobbes", s: "c13", k: "2", g: "Without assurance there is no place for industry" }
    ]
  },
  {
    id: "execution",
    title: "Execution under uncertainty",
    gloss: "Why real performance falls short of plan — friction, fog, chance — and the postures that survive it: adaptability, prepared defences, and energy as the root of wealth.",
    ps: [
      { w: "clausewitz", s: "c7", k: "1", g: "Everything is very simple; the simplest thing is difficult" },
      { w: "clausewitz", s: "c7", k: "2", g: "Friction: every individual in the machine has his own" },
      { w: "clausewitz", s: "c3", k: "1", g: "Three-fourths of the relevant facts are in fog" },
      { w: "suntzu", s: "c6", k: "29-32", g: "Tactics like water: no constant shape, no constant conditions" },
      { w: "machiavelli", s: "c25", k: "1", g: "Fortune governs half; dikes are built in fair weather" },
      { w: "kautilya", s: "b1c19", k: "2", g: "The root of wealth is activity" }
    ]
  },
  {
    id: "leadership",
    title: "Leadership and judgment",
    gloss: "What separates leading stakeholders from being led by them; the specification of executive intellect; and the hardest call in strategy — valuing an organization's real strength.",
    ps: [
      { w: "thucydides", s: "ii65", k: "1", g: "Pericles could afford to anger them by contradiction" },
      { w: "thucydides", s: "ii65", k: "2", g: "His successors outsourced judgment to sentiment" },
      { w: "kautilya", s: "b6c1", k: "2", g: "Inquiry to steadfast adherence: the qualities of the intellect" },
      { w: "kautilya", s: "b1c19", k: "1", g: "In the happiness of his subjects lies his happiness" },
      { w: "bacon", s: "greatness", k: "1", g: "Nothing more subject to error than valuing an estate's real power" },
      { w: "clausewitz", s: "s28", k: "1", g: "Passion, chance and reason: omit one and the plan destroys itself" }
    ]
  }
];

function viewConcordance() {
  const wrap = el(`<div>
    <div class="viewhead">
      <span class="tag">Executive concordance</span>
      <h1>Eight challenges, mapped to the sources</h1>
      <p class="lede">Current C-level problems, each linked to the exact passages across the corpus
      that address its structure. Every chip opens the reader at that passage. The mapping is editorial
      — an invitation to read, not a proof by citation; the protocol for responsible analogy is in the
      <a href="#/introduction">introduction</a>, §4.</p>
    </div>
  </div>`);
  THEMES.forEach(th => {
    const card = el(`<div class="panel theme">
      <h2 style="margin-top:0">${esc(th.title)}</h2>
      <p class="lede" style="font-size:.95rem">${esc(th.gloss)}</p>
    </div>`);
    th.ps.forEach(p => {
      const w = workById(p.w); const t = D.texts[p.w];
      const sec = t.sections.find(s => s.id === p.s);
      const u = sec.units.find(x => String(x.k) === String(p.k));
      card.append(el(`<div class="passage">
        <a class="cite" href="#/work/${p.w}/${esc(p.s)}/${esc(p.k)}">${esc(citeOf(w, sec, u))}</a>
        <span class="gloss">${esc(w.author)} — ${esc(p.g)}</span>
      </div>`));
    });
    wrap.append(card);
  });
  view.append(wrap);
}

/* =============================================================== ATLAS */
/* Co-occurrence network of the leading terms across the corpus.
   Data precomputed by tools/build-network.js into data/network.json. */
let NET = null, atlasStop = null;

async function viewAtlas() {
  if (!NET) NET = await fetch("data/network.json").then(r => r.json());
  view.append(el(`<div>
    <div class="viewhead"><span class="tag">Term network</span>
      <h1>Atlas</h1>
      <p class="lede">The ${NET.nodes.length} leading content terms of the corpus, linked where they
      occur in the same excerpt unit. Colour is the line whose texts use the term most
      (<span style="color:var(--state)">statecraft</span> ·
      <span style="color:var(--trade)">trade</span> ·
      <span style="color:var(--strat)">strategy</span>); size is frequency. Click a term for its
      neighbours and citations — a conceptual map of how the twelve works share one vocabulary of
      power, trade and war.</p></div>
    <div class="toolbar">
      <label class="fine" for="dens">Density</label>
      <select id="dens">
        <option value="160">sparse</option>
        <option value="320" selected>medium</option>
        <option value="600">dense</option>
      </select>
      <span class="fine" id="atlasinfo"></span>
    </div>
    <div class="card" style="padding:0;overflow:hidden"><canvas id="cv" style="width:100%;display:block;cursor:pointer"></canvas></div>
    <div id="sel"></div>
    <div class="card" style="margin-top:1.2rem"><span class="tag">Bridge terms</span>
      <p style="margin:.5rem 0 0" class="readable">Terms carried by four or more of the works — the
      shared vocabulary in which the lines argue with each other:
      ${NET.bridges.map(b => `<button class="chip" data-b="${esc(b)}">${esc(b)}</button>`).join(" ")}</p></div>
  </div>`));
  const cv = view.querySelector("#cv");
  const selBox = view.querySelector("#sel");
  const densSel = view.querySelector("#dens");
  const W = Math.min(view.clientWidth || 900, 980), H = Math.max(460, Math.round(W * 0.62));
  const dpr = window.devicePixelRatio || 1;
  cv.width = W * dpr; cv.height = H * dpr; cv.style.height = H + "px";
  const cx = cv.getContext("2d"); cx.scale(dpr, dpr);

  const nodes = NET.nodes.map(n => ({ ...n,
    x: W / 2 + (Math.random() - 0.5) * W * 0.8, y: H / 2 + (Math.random() - 0.5) * H * 0.8,
    vx: 0, vy: 0, r: 3 + Math.sqrt(n.f) * 1.4 }));
  const byId = Object.fromEntries(nodes.map(n => [n.id, n]));
  const LBL = [...nodes.map(n => n.f)].sort((a, b) => b - a)[24] || 3;
  let edges = [], selected = null, tick = 0;

  function setDensity() {
    edges = NET.edges.slice(0, +densSel.value).map(e => ({ ...e, a: byId[e.s], b: byId[e.t] }))
      .filter(e => e.a && e.b);
    view.querySelector("#atlasinfo").textContent =
      `${nodes.length} terms · ${edges.length} links · from ${NET.n_units} excerpt units`;
    tick = 0;
  }
  setDensity();
  densSel.onchange = setDensity;

  function step() {
    /* simple force layout: pairwise repulsion, spring on edges, center pull */
    for (const n of nodes) { n.fx = 0; n.fy = 0; }
    for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i], b = nodes[j];
      let dx = a.x - b.x, dy = a.y - b.y, d2 = dx * dx + dy * dy + 40;
      const f = 1400 / d2;
      const d = Math.sqrt(d2);
      dx /= d; dy /= d;
      a.fx += dx * f; a.fy += dy * f; b.fx -= dx * f; b.fy -= dy * f;
    }
    for (const e of edges) {
      let dx = e.b.x - e.a.x, dy = e.b.y - e.a.y;
      const d = Math.sqrt(dx * dx + dy * dy) || 1;
      const want = 60 + 700 / (e.w + 4);
      const f = (d - want) * 0.004 * Math.min(e.w, 6);
      dx /= d; dy /= d;
      e.a.fx += dx * f * d * 0.02; e.a.fy += dy * f * d * 0.02;
      e.b.fx -= dx * f * d * 0.02; e.b.fy -= dy * f * d * 0.02;
    }
    for (const n of nodes) {
      n.fx += (W / 2 - n.x) * 0.004; n.fy += (H / 2 - n.y) * 0.004;
      n.vx = (n.vx + n.fx) * 0.82; n.vy = (n.vy + n.fy) * 0.82;
      n.x += n.vx; n.y += n.vy;
      n.x = Math.max(14, Math.min(W - 14, n.x)); n.y = Math.max(14, Math.min(H - 14, n.y));
    }
  }

  const COLOR = { state: "#8fb4d9", trade: "#c9a15a", strat: "#c98070" };
  function draw() {
    cx.clearRect(0, 0, W, H);
    const neigh = new Set();
    if (selected) for (const e of edges) {
      if (e.a === selected) neigh.add(e.b);
      if (e.b === selected) neigh.add(e.a);
    }
    for (const e of edges) {
      const on = selected && (e.a === selected || e.b === selected);
      cx.strokeStyle = on ? "rgba(201,161,90,.55)" : "rgba(160,160,180,.13)";
      cx.lineWidth = on ? 1.4 : Math.min(1, 0.3 + e.w * 0.05);
      cx.beginPath(); cx.moveTo(e.a.x, e.a.y); cx.lineTo(e.b.x, e.b.y); cx.stroke();
    }
    for (const n of nodes) {
      const dimmed = selected && n !== selected && !neigh.has(n);
      cx.globalAlpha = dimmed ? 0.25 : 1;
      cx.fillStyle = COLOR[n.linie];
      cx.beginPath(); cx.arc(n.x, n.y, n.r, 0, 7); cx.fill();
      if (n === selected) { cx.strokeStyle = "#fff"; cx.lineWidth = 1.5; cx.stroke(); }
      if (!dimmed && (n.f >= LBL || n === selected || neigh.has(n))) {
        cx.fillStyle = "rgba(233,230,224,.92)";
        cx.font = (n === selected ? "600 " : "") + "11px system-ui, sans-serif";
        cx.textAlign = "center";
        cx.fillText(n.id, n.x, n.y - n.r - 4);
      }
      cx.globalAlpha = 1;
    }
  }

  let raf;
  function loop() {
    if (tick < 260) { step(); tick++; }
    draw();
    raf = requestAnimationFrame(loop);
  }
  loop();
  atlasStop = () => cancelAnimationFrame(raf);

  function select(n) {
    selected = n;
    selBox.innerHTML = "";
    if (!n) return;
    const co = edges.filter(e => e.a === n || e.b === n)
      .map(e => ({ o: e.a === n ? e.b : e.a, c: e.c })).sort((a, b) => b.c - a.c).slice(0, 14);
    const wk = Object.entries(n.works).sort((a, b) => b[1] - a[1]);
    selBox.append(el(`<div class="card" style="margin-top:1.2rem">
      <div style="display:flex;gap:.8rem;align-items:baseline;flex-wrap:wrap">
        <h3 style="margin:0;color:${COLOR[n.linie]}">${esc(n.id)}</h3>
        <span class="fine">${n.f} excerpt units · in ${n.spread} of ${D.works.length} works</span></div>
      <p class="fine" style="margin:.4rem 0">${wk.map(([id, c]) => {
        const w = workById(id);
        return `${esc(w ? w.abbr : id)}: ${c}`; }).join(" · ")}</p>
      <p style="margin:.4rem 0 0">${co.map(x =>
        `<button class="chip" data-b="${esc(x.o.id)}">${esc(x.o.id)} <span class="fine">${x.c}</span></button>`).join(" ")}</p>
      <p style="margin:.6rem 0 0">${n.cites.map(([wid, sid, k]) => {
        const w = workById(wid);
        const t = D.texts[wid];
        const s = t && t.sections.find(x => x.id === sid);
        const u = s && s.units.find(x => String(x.k) === String(k));
        return u ? `<a class="cite" href="#/work/${wid}/${esc(sid)}/${esc(k)}">${esc(citeOf(w, s, u))}</a>` : "";
      }).join(" ")}</p>
    </div>`));
    selBox.querySelectorAll("[data-b]").forEach(b => b.onclick = () => select(byId[b.dataset.b]));
  }

  cv.onclick = ev => {
    const r = cv.getBoundingClientRect();
    const x = (ev.clientX - r.left) * (W / r.width), y = (ev.clientY - r.top) * (H / r.height);
    let best = null, bd = 400;
    for (const n of nodes) {
      const d = (n.x - x) ** 2 + (n.y - y) ** 2;
      if (d < bd && d < (n.r + 10) ** 2) { best = n; bd = d; }
    }
    select(best);
  };
  view.querySelectorAll("[data-b]").forEach(b => b.onclick = () => select(byId[b.dataset.b]));
}

/* ======================================================== APPLICATIONS */
function viewApplications() {
  view.append(el(`<div>
    <div class="viewhead">
      <span class="tag">Applications</span>
      <h1>The corpus, applied to the present</h1>
      <p class="lede">Two companion sites by the same author put this way of reading to work on live
      events. Both are free, tracker-free, and independent of any institution.</p>
    </div>

    <div class="grid g2">
      <div class="card appcard linie-strat">
        <h2><a href="https://ukraine-war-monitor.netlify.app/" rel="noopener">Ukraine War Monitor</a></h2>
        <p class="url">ukraine-war-monitor.netlify.app</p>
        <p>A historically grounded, source-based overview of Russia's war against Ukraine (2022–present),
        with a daily OSINT analysis and an evidence-based monitoring dashboard. For readers of this
        corpus it is a standing laboratory: attrition and the culminating point
        (<a href="#/work/clausewitz">Clausewitz</a>), coalition cohesion and the politics of the
        hegemon's alliance (<a href="#/work/thucydides">Thucydides</a>), sanctions and the
        weaponization of interdependence (<a href="#/work/mun">Mun</a> ·
        <a href="#/work/smith">Smith</a>), sea power and the Black Sea grain routes
        (<a href="#/work/mahan">Mahan</a>), and heartland rhetoric deployed as justification
        (<a href="#/work/mackinder">Mackinder</a>) — all observable, daily, with sources.</p>
      </div>
      <div class="card appcard linie-state">
        <h2><a href="https://geopolitical-analogist.netlify.app/" rel="noopener">Geopolitical Analogist</a></h2>
        <p class="url">geopolitical-analogist.netlify.app</p>
        <p>An interactive engine for exactly the method this site preaches: describe a current political
        issue or conflict, and it proposes structured historical analogies — each with its points of
        likeness, its points of difference, and sources to check. Use it with the introduction's §4
        protocol open: analogies generate hypotheses, the differences column carries the analytic
        weight, and the first precedent to mind is the most available one, not the most apt.</p>
      </div>
    </div>

    <div class="panel">
      <h2>A short protocol for reading the present historically</h2>
      <p class="readable">1. State the present case first — known, unclear, presumed — before touching
      a precedent. 2. Generate at least two analogies that point in different directions. 3. For each,
      write likenesses and differences in explicit columns; weight the differences. 4. Prefer structural
      matches (incentives, capabilities, enforcement, geography) over dramatic ones (personalities,
      moral casting). 5. Convert the surviving analogy into checkable expectations — what should we see
      next if it holds? — and revisit on schedule. The pedigree of this protocol (Neustadt &amp; May,
      Khong, Jervis) is given in the <a href="#/introduction">introduction</a>.</p>
    </div>

    <p class="fine">These tools are analytical aids. Nothing on this site or its companions is
    investment, legal or policy advice.</p>
  </div>`));
}

/* ============================================================== METHOD */
function viewMethod() {
  view.append(el(`<div>
    <div class="viewhead">
      <span class="tag">Method &amp; rights</span>
      <h1>Method, sources and limits</h1>
      <p class="lede">What was selected, from which editions, under what rules, and what was left out.</p>
    </div>

    <div class="panel">
      <h2>Selection rules</h2>
      <p class="readable">Three rules governed the corpus. <strong>Public domain:</strong> every word of
      primary text on this site is in the United States public domain, either as an original English
      work by age or in a public-domain translation; no excerpt relies on fair use. <strong>Maximum
      twelve works</strong>, chosen for structural insight into leadership and geopolitics rather than
      for fame, grouped in three lines (statecraft, trade, strategy) whose rationale is in the
      <a href="#/introduction">introduction</a>. <strong>Excerpts, not monuments:</strong> each work is
      represented by its analytically load-bearing passages in exact wording, with omissions marked by
      ellipsis (…) — a reading apparatus, not a critical edition. Readers wanting the whole works are
      given the sources below.</p>
    </div>

    <div class="panel">
      <h2>Citation and anchors</h2>
      <p class="readable">Each excerpt unit carries a chip such as <span class="cite">Thuc. I.23 [1]</span>:
      the standard scholarly citation for the passage, plus this site's unit number in brackets. Chips
      are stable deep links (e.g. <span class="mono">#/work/thucydides/i23/1</span>) and can be cited or
      shared directly. Unit boundaries are editorial; the bracketed numbers belong to this site, the
      citations before them to the scholarly tradition.</p>
    </div>

    <div class="panel">
      <h2>Editions and sources</h2>
      <div class="tablewrap"><table>
        <tr><th>Work</th><th>Edition used</th><th>Source</th></tr>
        <tr><td>Thucydides, <em>History of the Peloponnesian War</em></td><td>tr. Richard Crawley, 1874</td><td><a href="https://www.gutenberg.org/ebooks/7142" rel="noopener">Project Gutenberg #7142</a></td></tr>
        <tr><td>Sun Tzŭ, <em>The Art of War</em></td><td>tr. Lionel Giles, 1910</td><td><a href="https://www.gutenberg.org/ebooks/132" rel="noopener">Project Gutenberg #132</a></td></tr>
        <tr><td>Kautilya, <em>Arthashastra</em></td><td>tr. R. Shamasastry, 1915</td><td><a href="https://archive.org/details/Arthasastra_English_Translation" rel="noopener">archive.org (Shamasastry ed.)</a></td></tr>
        <tr><td>Machiavelli, <em>The Prince</em></td><td>tr. W. K. Marriott, 1908</td><td><a href="https://www.gutenberg.org/ebooks/1232" rel="noopener">Project Gutenberg #1232</a></td></tr>
        <tr><td>Grotius, <em>Mare Liberum</em></td><td>tr. R. V. D. Magoffin, ed. J. B. Scott, Carnegie Endowment / Oxford UP, 1916</td><td><a href="https://archive.org/details/freedomofseasorr00grot" rel="noopener">archive.org (Toronto scan)</a></td></tr>
        <tr><td>Bacon, <em>Essays</em></td><td>original English, 1625 (modern-spelling edition)</td><td><a href="https://www.gutenberg.org/ebooks/575" rel="noopener">Project Gutenberg #575</a></td></tr>
        <tr><td>Mun, <em>England's Treasure by Forraign Trade</em></td><td>1664 text; Economic Classics reprint, ed. W. J. Ashley, Macmillan, 1895</td><td><a href="https://archive.org/details/englandstreasure00munuoft" rel="noopener">archive.org (Toronto scan)</a></td></tr>
        <tr><td>Hobbes, <em>Leviathan</em></td><td>original English, 1651</td><td><a href="https://www.gutenberg.org/ebooks/3207" rel="noopener">Project Gutenberg #3207</a></td></tr>
        <tr><td>Smith, <em>The Wealth of Nations</em>, Book IV</td><td>original English, 1776</td><td><a href="https://www.gutenberg.org/ebooks/3300" rel="noopener">Project Gutenberg #3300</a></td></tr>
        <tr><td>Clausewitz, <em>On War</em></td><td>tr. J. J. Graham, 1873</td><td><a href="https://www.gutenberg.org/ebooks/1946" rel="noopener">Project Gutenberg #1946</a></td></tr>
        <tr><td>Mahan, <em>The Influence of Sea Power upon History</em></td><td>original English, 1890</td><td><a href="https://www.gutenberg.org/ebooks/13529" rel="noopener">Project Gutenberg #13529</a></td></tr>
        <tr><td>Mackinder, "The Geographical Pivot of History"</td><td><em>The Geographical Journal</em> 23 (1904), 421–437</td><td><a href="https://archive.org/details/sim_geographical-journal_1904-04_23_4" rel="noopener">archive.org (issue scan)</a></td></tr>
      </table></div>
    </div>

    <div class="panel">
      <h2>Text handling</h2>
      <p class="readable">Excerpts reproduce their sources verbatim, including seventeenth-century
      spelling (Mun, Hobbes) and 1904 idiom (Mackinder). Interventions are limited to: rejoining words
      hyphenated across line breaks; removing the classical commentators interleaved in Giles's Sun Tzŭ
      and the marginal notes of the Mun reprint; correcting unambiguous OCR artifacts in the
      archive.org scans (e.g. misread letters in the Mun and Arthashastra texts) against the printed
      page; and marking every omission inside a unit with an ellipsis (…). Diacritics in Sanskrit terms
      follow the Shamasastry edition approximately. For Mackinder, wording was cross-verified against
      two independent digitizations of the 1904 printing; the closing passage retains the racial idiom
      of the original as a historical document, discussed in that work's headnote and executive lens.</p>
    </div>

    <div class="panel">
      <h2>The atlas</h2>
      <p class="readable">The <a href="#/atlas">atlas</a> is a co-occurrence network computed from the
      excerpt units themselves: its nodes are the corpus's leading content terms (after removal of
      function words and merging of early modern spelling variants — <span class="mono">warre</span>/war,
      <span class="mono">forraign</span>/foreign, <span class="mono">mony</span>/money), linked where
      two terms appear in the same unit, and coloured by the line whose works use them most. It is
      built by <span class="mono">tools/build-network.js</span> in the site repository — included
      there, so the mapping is reproducible — and precomputed into
      <span class="mono">data/network.json</span>; nothing is computed on a server. Because it is
      derived from curated excerpts rather than the full works, it maps this apparatus, not the
      complete texts: a reading aid, not corpus linguistics.</p>
    </div>

    <div class="panel">
      <h2>Considered and set aside</h2>
      <p class="readable">Giovanni Botero's <em>Della ragion di Stato</em> (1589) and Richelieu's
      <em>Testament politique</em> belong in this corpus intellectually, but their standard English
      translations (1956; 1961) remain in copyright, and shipping working translations was out of scope
      for this release. Jomini's <em>Art of War</em> (tr. Mendell &amp; Craighill, 1862) is public
      domain but was set aside as strategically redundant beside Clausewitz within a twelve-work limit.
      Selden's <em>Mare Clausum</em> (1635) is noted in the Grotius headnote as the standing
      counter-argument. Corbett's <em>Some Principles of Maritime Strategy</em> (1911) is public domain
      in the United States and is the most likely thirteenth work should the corpus limit ever be
      raised. The twentieth-century strategic canon — Angell, Liddell Hart, Schelling, Wohlstetter —
      remains in copyright and outside this site's rules.</p>
    </div>

    <div class="panel">
      <h2>Rights</h2>
      <p class="readable">All primary texts on this site are in the United States public domain by
      publication age (the youngest, Mackinder's paper, was published in 1904). The site's own
      editorial matter — headnotes, executive lenses, introduction, concordance glosses — is released
      under CC BY 4.0; the site's code under the MIT licence; the derived excerpt data files under CC0.
      See the repository's LICENSES file. The site is a personal research project; it is not legal,
      investment or policy advice, and it speaks for no institution.</p>
    </div>
  </div>`));
}

/* ============================================================ PRIVACY */
function viewPrivacy() {
  view.append(el(`<div>
    <div class="viewhead"><span class="tag">Privacy</span>
      <h1>Privacy notice</h1>
      <p class="lede">Stated at the level of detail at which it is actually true.</p></div>
    <div class="panel"><h2>Who is responsible</h2>
      <p class="readable">This site is operated by a private individual from the United States; the
      details are in the <a href="#/imprint">legal notice</a>. It is a personal research project, not
      operated on behalf of any institution, and no data from it is passed to anyone.</p>
      <p class="readable">Because the site is reachable from the European Economic Area, this notice is
      written to satisfy the General Data Protection Regulation as well as United States law. Where the
      GDPR applies to a reader, the operator is the controller within the meaning of Article 4(7).</p></div>
    <div class="panel"><h2>What this site is, technically</h2>
      <p class="readable">A set of static files and nothing else: no server functions, no accounts, no
      forms, no newsletter. The site sets <strong>no cookies whatsoever</strong> and uses no analytics,
      advertising or third-party services of any kind; all fonts and scripts are served from this site
      itself. Opening any page therefore contacts exactly one host: the one in your address bar. Search
      runs entirely in your browser; nothing you type is transmitted anywhere. Outbound links (to
      Project Gutenberg, the Internet Archive, and the two companion sites) are ordinary links: no data
      flows to those hosts unless you click them.</p></div>
    <div class="panel"><h2>Server logs</h2>
      <p class="readable">The site is hosted by Netlify. Like any web host, Netlify's infrastructure
      records the requests it serves — typically IP address, timestamp, requested URL, HTTP status,
      transferred bytes, user-agent and referrer. This is technically unavoidable in delivering a
      website and is the only server-side collection that takes place; the operator does not analyse it.
      Where the GDPR applies, the legal basis is Article 6(1)(f) — the legitimate interest in delivering
      a functioning, secure website. Retention follows Netlify's own periods. The site is operated and
      hosted in the United States; for readers in the EEA this means request data are processed outside
      the EEA.</p></div>
    <div class="panel"><h2>Your rights</h2>
      <p class="readable">Where the GDPR applies, readers have the rights of access, rectification,
      erasure, restriction, objection and data portability (Articles 15–21) and the right to complain to
      a supervisory authority (Article 77). Since this site stores no personal data of its own, such
      requests will usually concern Netlify's logs; the operator will assist. Contact: the address in
      the <a href="#/imprint">legal notice</a>.</p></div>
  </div>`));
}

/* ============================================================ IMPRINT */
function viewImprint() {
  view.append(el(`<div>
    <div class="viewhead"><span class="tag">Legal notice</span>
      <h1>Legal notice</h1>
      <p class="lede">Who operates this site, and how to reach them.</p></div>
    <div class="panel"><h2>Operator</h2>
      <p class="readable">
        Dr. Pantaleon Fassbender<br>
        16751 NE 5th Street<br>
        Williston, FL 32696<br>
        United States</p>
      <p class="readable">Email: <a href="mailto:pantaleonfassbender@gmail.com">pantaleonfassbender@gmail.com</a></p>
      <p class="readable">This site is a personal research project, operated and hosted in the United
      States by a private individual, and not on behalf of any institution, employer or publisher. There
      is no company behind it, and it carries no advertising and no sponsorship.</p>
      <p class="readable">Responsible for the content: Dr. Pantaleon Fassbender, at the address above.
      Data handling is set out in the <a href="#/privacy">privacy notice</a>.</p></div>
    <div class="panel"><h2>Rights in the texts</h2>
      <p class="readable">All texts shipped on this site are in the United States public domain; the
      full account, edition by edition, is on the <a href="#/method">method page</a>. The site's own
      editorial matter is released under CC BY 4.0, its code under the MIT licence, and its derived
      excerpt data under CC0 — see the repository's LICENSES file.</p></div>
  </div>`));
}

Object.assign(ROUTES, {
  overview: viewOverview, introduction: viewIntroduction, works: viewWorks,
  work: viewWork, concordance: viewConcordance, atlas: viewAtlas, applications: viewApplications,
  method: viewMethod, privacy: viewPrivacy, imprint: viewImprint,
});

boot();
