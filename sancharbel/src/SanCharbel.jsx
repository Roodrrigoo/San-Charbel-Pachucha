import { useEffect, useRef, useState } from "react";

// Images live on your site. In your own project change this to "/img/".
const IMG = "https://sancharbel-pachuca.vercel.app/img/";

const NAV = [
    ["Horarios", "horarios"], ["Trámites", "tramites"], ["Eventos", "eventos"], ["Sé parte", "separte"], ["Historia", "historia"],
];
const MENU = [
    ["Inicio", "inicio"], ["Horarios de misa", "horarios"], ["Sacramentos y trámites", "tramites"], ["Eventos", "eventos"],
    ["Sé parte", "separte"], ["Construyamos juntos", "obra"], ["Nuestra historia", "historia"], ["Contacto", "contacto"],
];
const TRAMITES = ["Bautizo", "Primera comunión", "Confirmación", "Matrimonio", "Misa de intención"];
const ROLES = [
    ["Foto y video", "Cubrir misas y eventos, documentar la obra y cuidar el archivo histórico."],
    ["Diseño", "Invitaciones, publicaciones y materiales con una identidad coherente."],
    ["Redes y web", "Publicar, responder mensajes y mantener la página al día."],
];
const FAQ = [
    ["¿Para quién es?", "Jóvenes y adultos con ganas de servir y aprender: estudiantes de diseño o comunicación, o cualquiera con celular y buen ojo."],
    ["¿Cuánto dura?", "Un año, renovable. Servimos sobre todo en fines de semana."],
    ["¿Qué te llevas?", "Constancia de participación, carta de recomendación y un portafolio real con tu trabajo publicado. Apoyo para viáticos: por confirmar."],
    ["¿Cómo es la selección?", "Envías tu postulación, te contactamos para una plática breve y publicamos los resultados en esta página."],
];

const Church = ({ size = 40 }) => (
    <svg width={size} height={size} viewBox="0 0 40 44" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M20 1v8M16 5h8M5 23 20 12l15 11M8 21v21M32 21v21M3 42h34M16 42V30h8v12" />
    </svg>
);

const Mark = ({ size = 44, className }) => (
    <svg className={className} width={size} height={size} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeLinecap="round" aria-hidden="true">
        <circle cx="24" cy="24" r="22" strokeWidth="1.8" />
        <circle cx="24" cy="24" r="18.5" strokeWidth=".8" />
        <path d="M24 9v30M14 21h20" strokeWidth="3.2" />
        <path d="M19 15h10" strokeWidth="2.6" />
    </svg>
);
const Cedar = ({ size = 52 }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="currentColor" aria-hidden="true">
        <path d="M24 3 15 14h5l-9 11h6L7 36h34L31 25h6L28 14h5z" /><rect x="22" y="36" width="4" height="9" />
    </svg>
);
const Orn = () => (
    <div className="orn" aria-hidden="true"><span />
        <svg width="18" height="22" viewBox="0 0 18 22" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M9 2v18M3 8h12" /></svg>
        <span /></div>
);

function Modal({ title, onClose, children }) {
    useEffect(() => {
        const esc = (e) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", esc);
        return () => window.removeEventListener("keydown", esc);
    }, [onClose]);
    return (
        <div className="overlay" onClick={onClose}>
            <div className="modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
                <button className="x" onClick={onClose} aria-label="Cerrar">✕</button>
                <h3>{title}</h3>
                {children}
            </div>
        </div>
    );
}

function Form({ children, button, thanks, className }) {
    const [sent, setSent] = useState(false);
    return (
        <form className={className} onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
            {children}
            <button className="pill full">{button}</button>
            {sent && <p className="ok">{thanks}</p>}
        </form>
    );
}

export default function SanCharbel() {
    const [solid, setSolid] = useState(false);
    const [menu, setMenu] = useState(false);
    const [rsvp, setRsvp] = useState(false);
    const [apply, setApply] = useState(false);
    const [tab, setTab] = useState(0);
    const [freq, setFreq] = useState("Una vez");
    const [amt, setAmt] = useState("$200");
    const [pay, setPay] = useState("Apple o Google Pay");
    const [envOpen, setEnvOpen] = useState(false);
    const [big, setBig] = useState(false);
    const envRef = useRef(null);

    useEffect(() => {
        const onScroll = () => setSolid(window.scrollY > 80);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => { document.documentElement.style.fontSize = big ? "132%" : ""; }, [big]);

    // The envelope opens by itself once it is fully on screen (after a short pause), or when tapped.
    useEffect(() => {
        let t;
        const io = new IntersectionObserver(([e]) => {
            clearTimeout(t);
            if (e.isIntersecting) t = setTimeout(() => setEnvOpen(true), 900);
        }, { threshold: 0.7 });
        envRef.current && io.observe(envRef.current);
        return () => { clearTimeout(t); io.disconnect(); };
    }, []);

    const pickAmount = (a) => {
        if (a === "Otro") {
            const v = window.prompt("¿Cuánto quieres donar? (MXN)");
            setAmt(v ? "$" + v : "$200");
        } else setAmt(a);
    };

    return (
        <>
            <style>{css}</style>

            {/* Header */}
            <header className={solid ? "bar solid" : "bar"}>
                <a href="#inicio" className="brand"><Mark size={44} /><span>Iglesia<br />San Charbel</span></a>
                <nav className="bar-c">
                    {NAV.map(([t, id]) => <a key={t} href={`#${id}`}>{t}</a>)}
                </nav>
                <div className="bar-r">
                    <button className="abtn" onClick={() => setBig((v) => !v)} aria-pressed={big} aria-label="Cambiar tamaño de letra">{big ? "A−" : "A+"}</button>
                    <a href="#obra" className="give-link">♡ Donar</a>
                    <button onClick={() => setMenu(true)}>☰ Menú</button>
                </div>
            </header>

            {menu && (
                <div className="menu">
                    <button className="x" onClick={() => setMenu(false)} aria-label="Cerrar menú">✕</button>
                    <p className="menu-title">Iglesia San Charbel</p>
                    {MENU.map(([t, id], i) => (
                        <a key={id} href={`#${id}`} onClick={() => setMenu(false)}><small>0{i + 1}</small>{t}</a>
                    ))}
                    <p className="menu-foot">Pachuca de Soto, Hidalgo<br />Domingos · 1:00 pm</p>
                </div>
            )}

            {/* Hero */}
            <section className="hero" id="inicio">
                <img src={IMG + "hero.jpg"} alt="" />
                <div className="hero-in">
                    <Mark size={76} className="mark" /><p className="tag">Parroquia maronita · Pachuca, Hidalgo</p>
                    <h1>Esta también<br />es tu casa</h1>
                    <p className="sub">San Charbel es una iglesia que apenas está naciendo, y la estamos construyendo juntos.</p>
                    <a className="pill light" href="#horarios">Ver horarios de misa</a>
                </div>
                <div className="year"><b>2024</b><span>Fundación</span></div>
                <a className="scroll" href="#bienvenida">↓<span>Desliza</span></a>
                <blockquote className="hq">“Vengas por una misa, un sacramento o porque algo te trajo, aquí hay un lugar para ti.”<cite>— Iglesia San Charbel</cite></blockquote>
            </section>

            {/* Bienvenida */}
            <section className="welcome" id="bienvenida">
                <div className="col left">
                    <svg className="ring" viewBox="0 0 140 140" aria-hidden="true">
                        <defs><path id="circ" d="M70,70 m-54,0 a54,54 0 1,1 108,0 a54,54 0 1,1 -108,0" /></defs>
                        <text><textPath href="#circ" textLength="334" lengthAdjust="spacing">UNIDOS POR AMOR · FORTALECIDOS POR LA FE ·</textPath></text>
                    </svg>
                    <div className="polaroid">
                        <img src={IMG + "lateral.jpg"} alt="Vitrales de una iglesia maronita" />
                        <p>Un mensaje del padre Ulises, 45 segundos.</p>
                    </div>
                </div>
                <div className="polaroid main">
                    <img src={IMG + "bienvenida.jpg"} alt="Interior de una iglesia maronita" />
                    <span className="play">▶ Video de bienvenida</span>
                    <a className="pill light" href="#historia">Conoce San Charbel</a>
                </div>
                <div className="col right">
                    <p className="mini">Domingos 1:00 pm</p>
                    <div className="polaroid"><img src={IMG + "torre.jpg"} alt="Pueblo libanés con su iglesia entre viñedos" /></div>
                    <span className="amp">&amp;</span>
                </div>
            </section>

            {/* Declaración */}
            <section className="statement">
                <Church />
                <p className="label dark">Iglesia maronita en Pachuca</p>
                <h2>Descubre una casa donde <em>fe,</em> <em>comunidad</em> y <em>servicio</em> se encuentran. Todos son bienvenidos</h2>
                <p className="muted">Parroquia San Charbel · Pachuca de Soto</p>
            </section>

            {/* Versículo */}
            <section className="verse">
                <Cedar size={58} />
                <blockquote>“El justo florecerá como la palmera, crecerá como un cedro del Líbano.”</blockquote>
                <cite>Salmo 92 · El cedro, símbolo de la fe maronita</cite>
            </section>

            {/* Horarios */}
            <section className="sand center" id="horarios">
                <p className="label">Horarios</p>
                <h2 className="h2">Horarios de misa</h2>
                <Orn /><p className="lead">Por ahora abrimos solo fines de semana mientras terminamos la construcción. Queremos abrir entre semana, y <a href="#separte">tú puedes ayudarnos</a>.</p>
                <div className="two">
                    <div className="box"><p className="label">Domingo</p><h3>Santa misa</h3><p className="time">1:00 pm</p></div>
                    <div className="box wine"><p className="label light">Primer sábado de cada mes</p><h3>Alabanza y adoración</h3><p className="time">Cada mes</p></div>
                </div>
                <div className="row"><a className="pill" href="#contacto">Cómo llegar</a><a className="pill" href="https://wa.me/">Escríbenos</a></div>
            </section>

            {/* Eventos */}
            <section className="center" id="eventos">
                <p className="label">Eventos</p>
                <h2 className="h2">Qué está pasando</h2>
                <Orn /><p className="lead">Lo que viene en San Charbel, con fecha, lugar y costo claros.</p>
                <div className="next">
                    <div className="next-d"><small>Próximo</small><b>Sábado</b><span>Primer sábado del mes</span></div>
                    <div className="next-t"><h3>Alabanza y adoración</h3><p>Música, oración y comunidad. Entrada libre.</p></div>
                    <button className="pill" onClick={() => setRsvp(true)}>Aparta tu lugar</button>
                </div>
            </section>

            {/* Invitación */}
            <section className="invite" style={{ backgroundImage: `url(${IMG}inv-a.jpg)` }}>
                <p className="tag">Estás invitado</p>
                <div className="when">
                    <div><h3>Cuándo</h3><h4>Primer sábado de cada mes</h4><p>Alabanza y adoración<br />Y todos los domingos, santa misa a la 1:00 pm</p></div>
                    <div><h3>Dónde</h3><h4>San Charbel, Pachuca</h4><p>Pachuca de Soto, Hidalgo</p></div>
                </div>
                <button ref={envRef} className={"env" + (envOpen ? " open" : "")} onClick={() => (envOpen ? setRsvp(true) : setEnvOpen(true))} aria-label="Confirma tu lugar">
                    <span className="hint">{envOpen ? "Toca para confirmar tu lugar" : "Toca para abrir"}</span>
                    <img className="e-closed" src={IMG + "sobre-cerrado-h.webp"} alt="" />
                    <img className="e-open" src={IMG + "sobre-abierto.webp"} alt="" />
                    <span className="card"><b>Confirma tu lugar</b><i>Te esperamos con gusto</i></span>
                    <span className="seal">S✝C</span>
                </button>
            </section>

            {/* Santo */}
            <section className="saint">
                <img src={IMG + "charbel.jpg"} alt="Monasterio de San Charbel en Annaya, Líbano" />
                <div>
                    <p className="label">Nuestro santo</p>
                    <h2 className="h2">¿Quién es San Charbel?</h2>
                    <p>Monje libanés que vivió en oración y silencio en el siglo XIX. Hoy millones de personas, en el Líbano y en México, le confían sus peticiones.</p>
                    <p>Somos la parroquia maronita de Pachuca: la casa de la comunidad maronita de toda la ciudad, y abierta a todo el que llegue.</p>
                    <a className="pill" href="#historia">Conoce su historia y el rito maronita</a>
                </div>
            </section>

            {/* Trámites */}
            <section className="sand center" id="tramites">
                <p className="label">Sacramentos y trámites</p>
                <h2 className="h2">¿Necesitas un trámite?</h2>
                <Orn /><p className="lead">Elige tu trámite, revisa los requisitos y envía tus documentos. Te confirmamos por WhatsApp.</p>
                <div className="tabs">
                    {TRAMITES.map((t, i) => (
                        <button key={t} className={"pill" + (tab === i ? " on" : "")} onClick={() => setTab(i)}>{t}</button>
                    ))}
                </div>
                <div className="panel">
                    <div className="req">
                        <h3>{TRAMITES[tab]}</h3>
                        <p className="muted">Requisitos por confirmar con la parroquia</p>
                        <p className="label dark strong">Así funciona</p>
                        <ol><li>Elige una fecha tentativa</li><li>Envía tus documentos</li><li>Te confirmamos por WhatsApp</li></ol>
                    </div>
                    <Form key={tab} className="formcard" button="Enviar solicitud" thanks="Recibimos tu solicitud. Te confirmamos por WhatsApp.">
                        <h3>Solicitud de {TRAMITES[tab].toLowerCase()}</h3>
                        <label>Nombre de quien solicita<input required /></label>
                        <label>WhatsApp<input type="tel" required /></label>
                        <label>Fecha que te gustaría<input type="date" /></label>
                        <label>Documentos<input type="file" accept="image/*,.pdf" multiple />
                            <small>Toma una foto o sube el archivo. Tus documentos son privados: solo los recibe la parroquia y nunca se publican.</small></label>
                        <label className="chk"><input type="checkbox" required /> Acepto el <a href="#contacto">aviso de privacidad</a></label>
                    </Form>
                </div>
            </section>

            {/* Sé parte */}
            <section className="center" id="separte">
                <p className="label">Sé parte</p>
                <h2 className="h2">Esta iglesia la construimos entre todos</h2>
                <Orn /><p className="lead">Encuentra tu lugar.</p>
                <div className="two wide">
                    <div className="box left"><p className="label">Grupo carismático</p><h3>Alabanza y adoración cada primer sábado</h3></div>
                    <div className="box left"><p className="label">Voluntariado</p><h3>Ayúdanos a abrir entre semana</h3><p>Voluntarios que acompañan el templo entre semana.</p><a className="pill" href="#contacto">Quiero ayudar</a></div>
                </div>
                <div className="media">
                    <div>
                        <p className="label light strong">Convocatoria abierta</p>
                        <h2 className="h2 light">Equipo de Medios San Charbel</h2>
                        <p>Contamos la historia de una iglesia que está naciendo: cubrimos eventos, documentamos la obra y compartimos lo que pasa aquí.</p>
                        <p className="soft">Un año de servicio con constancia, carta de recomendación y portafolio.</p>
                        <button className="pill light" onClick={() => setApply(true)}>Postúlate</button>
                    </div>
                    <ul>{ROLES.map(([t, d]) => <li key={t}><h3>{t}</h3><p>{d}</p></li>)}</ul>
                </div>
                <div className="faq">{FAQ.map(([q, a]) => <div key={q}><p className="label">{q}</p><p>{a}</p></div>)}</div>
            </section>

            {/* Obra */}
            <section className="sand center" id="obra">
                <p className="label">Construyamos juntos</p>
                <h2 className="h2">Estamos levantando nuestra iglesia, piedra por piedra</h2>
                <Orn /><p className="lead">Cada donativo ayuda a terminar la obra y se refleja en el informe del mes.</p>
                <div className="obra">
                    <img src={IMG + "obra1.jpg"} alt="Muro de piedra en construcción" />
                    <div className="give">
                        <h3>Pon tu piedra</h3>
                        <p className="muted">Cada donativo se refleja en el informe del mes. Si necesitas comprobante, lo recibes por correo o WhatsApp.</p>
                        <div className="g2">{["Una vez", "Cada mes"].map((f) => <button key={f} className={freq === f ? "on" : ""} onClick={() => setFreq(f)}>{f}</button>)}</div>
                        <div className="g4">{["$100", "$200", "$500", "Otro"].map((a) => <button key={a} className={amt === a ? "on" : ""} onClick={() => pickAmount(a)}>{a}</button>)}</div>
                        <div className="g3">{["Apple o Google Pay", "Tarjeta", "SPEI u OXXO"].map((p) => <button key={p} className={pay === p ? "on" : ""} onClick={() => setPay(p)}>{p}</button>)}</div>
                        <button className="pill full">Donar {amt}</button>
                    </div>
                </div>
            </section>

            {/* Historia */}
            <section className="center" id="historia">
                <p className="label">Nuestra historia</p>
                <h2 className="h2">Una casa que apenas está naciendo</h2>
                <Orn /><p className="lead">San Charbel fue un monje libanés del siglo XIX. Hoy su fe une a la comunidad maronita de Pachuca, y esta parroquia está abierta a todo el que llegue.</p>
                <div className="gallery">
                    <img src={IMG + "capilla.jpg"} alt="Capilla en el monte Líbano" />
                    <img src={IMG + "altar.jpg"} alt="Vela en el altar" />
                    <img src={IMG + "cedros.jpg"} alt="Cedros del Líbano" />
                </div>
            </section>

            <footer id="contacto">
                <Mark size={68} />
                <h2>Iglesia San Charbel</h2>
                <p>Pachuca de Soto, Hidalgo</p>
                <nav><a href="https://wa.me/">Escríbenos por WhatsApp</a><a href="https://facebook.com/">Facebook</a><a href="#contacto">Aviso de privacidad</a></nav>
            </footer>

            {rsvp && (
                <Modal title="Aparta tu lugar" onClose={() => setRsvp(false)}>
                    <Form button="Confirmar asistencia" thanks="Listo, te esperamos con gusto.">
                        <label>Nombre<input required /></label>
                        <label>WhatsApp<input type="tel" required /></label>
                        <label>¿Cuántas personas?<select>{[1, 2, 3, 4, 5, 6].map((n) => <option key={n}>{n}</option>)}</select></label>
                    </Form>
                </Modal>
            )}
            {apply && (
                <Modal title="Postúlate" onClose={() => setApply(false)}>
                    <Form button="Enviar postulación" thanks="Recibimos tu postulación. Te contactamos pronto.">
                        <label>Nombre<input required /></label>
                        <label>WhatsApp<input type="tel" required /></label>
                        <label>Rol que te interesa<select required defaultValue=""><option value="" disabled>Elige un rol</option>{ROLES.map(([r]) => <option key={r}>{r}</option>)}</select></label>
                        <label>Algo que hayas hecho (opcional)<input /></label>
                    </Form>
                </Modal>
            )}
        </>
    );
}

const css = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Barlow:wght@400;500;600&family=Pinyon+Script&display=swap');
:root{color-scheme:light;--bg:#faf5f1;--sand:#f1e6df;--wine:#4a0a10;--red:#b3261e;--ink:#1e1917;--mute:#463f44;--serif:'Cormorant Garamond',Georgia,serif;--sans:'Barlow',system-ui,sans-serif;--pad:clamp(1.25rem,5vw,5rem);--max:1440px}
*{box-sizing:border-box;margin:0}
html{scroll-behavior:smooth;font-size:112.5%}
body{font:400 1.1rem/1.75 var(--sans);color:var(--ink);background:var(--bg);-webkit-font-smoothing:antialiased}
#root{width:100%;max-width:none;margin:0;border:0;text-align:initial;display:block;min-height:0}
h1,h2,h3,h4{color:inherit;font-weight:500}
p{margin:0}
img{display:block;max-width:100%}
a{color:inherit}
section{padding:clamp(4.5rem,9vw,8rem) max(var(--pad),calc((100% - var(--max))/2))}
.center{text-align:center}
.sand{background:var(--sand)}
.h2{font:500 clamp(2.4rem,5.2vw,4.6rem)/1.08 var(--serif);margin-bottom:1.2rem;letter-spacing:-.01em}
h3{font:500 clamp(1.6rem,2.4vw,2rem)/1.2 var(--serif)}
.label{font-size:.85rem;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:var(--red);margin-bottom:.8rem}
.label.dark{color:var(--wine)}.label.light{color:#f6cfc9}.label.strong{font-weight:600}
.lead{max-width:62ch;margin:0 auto 3rem;color:var(--mute);font-size:1.3rem}
.lead a{color:var(--red);font-weight:500}
.muted{color:var(--mute)}
.pill{display:inline-block;border:1.5px solid var(--wine);color:var(--wine);background:transparent;border-radius:999px;padding:.95rem 2.2rem;font:600 .85rem var(--sans);letter-spacing:.16em;text-transform:uppercase;text-decoration:none;cursor:pointer;transition:background .2s,color .2s,transform .2s,box-shadow .2s}
.pill:hover,.pill.on{background:var(--wine);color:#fff}
.pill:hover{transform:translateY(-2px);box-shadow:0 10px 24px rgba(74,10,16,.2)}
.pill.light{border-color:#fff;color:#fff}.pill.light:hover{background:#fff;color:var(--wine)}
.pill.full{width:100%;display:block;margin-top:1.2rem;background:var(--wine);color:#fff}
.pill.full:hover{background:var(--red);border-color:var(--red)}
:focus-visible{outline:2px solid var(--red);outline-offset:3px}

/* header */
.bar{position:fixed;inset:0 0 auto;z-index:30;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;padding:1.4rem var(--pad);color:#fff;font-size:.85rem;font-weight:500;letter-spacing:.16em;text-transform:uppercase;background:linear-gradient(rgba(10,6,5,.65),transparent);transition:background .3s,color .3s,padding .3s}
.bar.solid{background:rgba(250,245,241,.94);backdrop-filter:blur(10px);color:var(--ink);padding-block:.8rem;box-shadow:0 1px 0 rgba(0,0,0,.08)}
.bar a{text-decoration:none}.bar-c{display:flex;gap:2rem}
.bar-c a,.bar-c span{opacity:.9}.bar-c a:hover{opacity:1;text-decoration:underline;text-underline-offset:6px}
.bar-r{justify-self:end;background:none;border:0;color:inherit;font:inherit;letter-spacing:inherit;text-transform:inherit;cursor:pointer}
@media(max-width:1100px){.bar{padding-inline:1.25rem;grid-template-columns:1fr 1fr}.bar-c{display:none}}
.menu{position:fixed;inset:0;z-index:50;background:var(--wine);color:#fff;display:flex;flex-direction:column;justify-content:center;padding:0 clamp(1.5rem,10vw,8rem);overflow:auto}
.menu a{font:400 clamp(1.8rem,4vw,2.8rem)/1.5 var(--serif);text-decoration:none;color:#fff}
.menu a:hover{color:#f6cfc9}
.menu a small{font:500 .7rem var(--sans);color:#f08a80;margin-right:1.2rem;letter-spacing:.2em}
.menu-title{font:italic 1.4rem var(--serif);margin-bottom:1.5rem;color:#f6cfc9}
.menu-foot{margin-top:2rem;font-size:.9rem;color:#f6cfc9}
.x{position:absolute;top:1.2rem;right:1.4rem;background:none;border:0;font-size:1.4rem;color:inherit;cursor:pointer}

/* hero */
.hero{position:relative;min-height:100svh;display:grid;place-items:center;text-align:center;color:#fff;padding:7rem var(--pad) 8rem;background:#2a1a12;isolation:isolate}
.hero>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:-2}
.hero:after{content:"";position:absolute;inset:0;z-index:-1;background:linear-gradient(180deg,rgba(10,6,5,.55) 0%,rgba(10,6,5,.45) 45%,rgba(10,6,5,.8) 100%)}
.hero-in{max-width:1100px}
.tag{font-size:.9rem;font-weight:600;letter-spacing:.26em;text-transform:uppercase;color:#fff}
.hero h1{font:500 clamp(3.4rem,10.5vw,9.5rem)/.95 var(--serif);text-transform:uppercase;margin:1.4rem 0 1.8rem;color:#fff;text-shadow:0 4px 40px rgba(0,0,0,.45)}
.sub{max-width:40ch;margin:0 auto 2.4rem;font-size:1.45rem;color:#fff;text-shadow:0 1px 14px rgba(0,0,0,.5)}
.year{position:absolute;left:var(--pad);bottom:3rem;text-align:left}
.year b{display:block;font:500 3.4rem/1 var(--serif)}.year span{font-size:.75rem;letter-spacing:.22em;text-transform:uppercase}
.scroll{position:absolute;left:50%;bottom:2.2rem;transform:translateX(-50%);display:grid;justify-items:center;font-size:.7rem;letter-spacing:.2em;text-transform:uppercase;text-decoration:none;line-height:1.4;color:#fff}
.hq{position:absolute;right:var(--pad);bottom:3rem;max-width:360px;text-align:left;font-size:1.15rem;line-height:1.55;padding:1.2rem 1.4rem;background:rgba(10,6,5,.4);backdrop-filter:blur(8px);border-left:3px solid #f08a80;color:#fff}
.hq cite{display:block;font-size:.78rem;font-style:normal;margin-top:.6rem;color:#f6cfc9}
@media(max-width:1100px){.year,.hq{display:none}}

/* welcome collage */
.welcome{border-top:5px solid var(--wine);display:grid;grid-template-columns:1fr 1.7fr 1fr;gap:clamp(1.5rem,3vw,3.5rem);align-items:center;padding-block:clamp(5rem,10vw,9rem)}
.polaroid{position:relative;background:#fff;padding:14px;box-shadow:0 24px 60px rgba(74,10,16,.16);transition:transform .4s}
.polaroid:hover{transform:translateY(-6px) rotate(-.4deg)}
.polaroid img{width:100%;object-fit:cover}
.polaroid p{font-size:1.1rem;padding:1rem .2rem .4rem;line-height:1.5;color:var(--mute)}
.col{position:relative}
.col.left{margin-top:5rem}.col.right{margin-top:-3rem}
.col.left .polaroid img{aspect-ratio:3/4}
.ring{position:absolute;width:150px;top:-135px;left:0;fill:var(--wine);font:600 9.5px var(--sans);animation:spin 40s linear infinite}
.main img{aspect-ratio:4/5;min-height:420px}
.main .play{position:absolute;top:50%;left:0;right:0;text-align:center;color:#fff;font-weight:600;letter-spacing:.08em;text-shadow:0 2px 14px rgba(0,0,0,.7)}
.main .pill{position:absolute;bottom:2.5rem;left:50%;transform:translateX(-50%);white-space:nowrap;background:rgba(10,6,5,.35);backdrop-filter:blur(6px)}
.main .pill:hover{transform:translateX(-50%)}
.mini{text-align:center;font-size:.85rem;font-weight:600;letter-spacing:.22em;text-transform:uppercase;margin-bottom:1rem;color:var(--wine)}
.col.right .polaroid img{aspect-ratio:3/4.4}
.amp{position:absolute;right:-1rem;bottom:-5rem;font:400 9rem/1 'Pinyon Script',cursive;color:var(--red)}
@keyframes spin{to{transform:rotate(360deg)}}
@media(max-width:900px){.welcome{grid-template-columns:1fr;max-width:560px;margin:auto}.col.left,.col.right{margin-top:0}.ring,.amp{display:none}}

/* statement */
.statement{text-align:center;color:var(--wine);padding-top:2rem}
.statement svg{margin:0 auto 1rem}
.statement h2{max-width:1200px;margin:.5rem auto 2rem;font:500 clamp(2.2rem,5.4vw,4.8rem)/1.12 var(--serif);text-transform:uppercase;color:var(--ink)}
.statement em{text-transform:none;font-style:italic;color:var(--red)}

/* boxes */
.two{display:grid;grid-template-columns:1fr 1fr;gap:2rem;margin:0 auto 2.5rem;text-align:left}
.box{background:#fff;padding:clamp(2rem,3.5vw,3.2rem);border:1px solid rgba(74,10,16,.08);box-shadow:0 14px 40px rgba(74,10,16,.07);transition:transform .3s,box-shadow .3s}
.box:hover{transform:translateY(-4px);box-shadow:0 22px 50px rgba(74,10,16,.13)}
.box.wine{background:var(--wine);color:#fff;border-color:var(--wine)}
.box.wine h3{color:#fff}
.box.left .pill{margin-top:1rem}.box h3{margin-bottom:.6rem}.box p{color:var(--mute)}.box.wine p{color:#f0d9d6}
.time{font:500 clamp(3rem,5vw,4.4rem)/1.1 var(--serif);color:var(--red)!important}.wine .time{color:#fff!important}
.row{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap}
.wide{margin-top:2rem}
@media(max-width:760px){.two{grid-template-columns:1fr}}

/* eventos */
.next{margin:0 auto;background:#fff;border-left:5px solid var(--red);box-shadow:0 14px 40px rgba(74,10,16,.08);display:grid;grid-template-columns:240px 1fr auto;gap:2rem;align-items:center;padding:2.2rem clamp(1.5rem,3vw,3rem);text-align:left}
.next-d{text-align:center;display:grid;line-height:1.3}
.next-d small{font-size:.72rem;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:var(--red)}
.next-d b{font:500 3rem/1.1 var(--serif)}.next-d span{font-size:1.05rem;color:var(--mute)}
.next-t p{color:var(--mute)}
@media(max-width:860px){.next{grid-template-columns:1fr;text-align:center}}

/* invitación */
.invite{position:relative;min-height:100svh;background-size:cover;background-position:center;color:#fff;text-align:center;display:flex;flex-direction:column;align-items:center;padding-bottom:0;isolation:isolate}
.invite:before{content:"";position:absolute;inset:0;background:linear-gradient(rgba(10,14,18,.6),rgba(10,14,18,.7));z-index:-1}
.when{display:grid;grid-template-columns:1fr 1fr;gap:3rem;margin:1.5rem 0 auto;max-width:1000px;width:100%}
.when h3{font:400 clamp(3rem,6vw,4.8rem)/1.1 'Pinyon Script',cursive;color:#ffc4cd;text-shadow:0 2px 12px rgba(0,0,0,.5)}
.when h4{font:500 clamp(1.6rem,2.4vw,2.1rem)/1.2 var(--serif);color:#fff}.when p{font:400 1.4rem/1.6 var(--serif);color:#f3ece8}
.env{position:relative;width:min(92%,600px);background:none;border:0;padding:0;margin-top:3rem;cursor:pointer;transition:transform .3s}
.env:hover{transform:translateY(-6px)}
.env img{width:100%}
.card{position:absolute;left:50%;top:22%;transform:translateX(-50%);display:grid;gap:.2rem;color:var(--wine);width:60%}
.card b{font:600 1.15rem var(--serif);letter-spacing:.22em;text-transform:uppercase;border-bottom:1px solid var(--red);padding-bottom:.35rem}
.card i{font:italic 1.15rem var(--serif);color:#5a4a45}
.seal{position:absolute;inset:0;display:grid;place-items:center;font:600 1.8rem var(--serif);color:#f0d49a}
@media(max-width:700px){.when{grid-template-columns:1fr;gap:1.5rem}}

/* santo */
.saint{display:grid;grid-template-columns:1.1fr 1fr;gap:clamp(2.5rem,6vw,6rem);align-items:center}
.saint img{aspect-ratio:4/4.6;object-fit:cover;width:100%;box-shadow:0 30px 70px rgba(74,10,16,.2)}
.saint p{margin-bottom:1.1rem;color:var(--mute);font-size:1.3rem}.saint .h2{margin-bottom:1.5rem}.saint .pill{margin-top:1rem}
@media(max-width:860px){.saint{grid-template-columns:1fr;gap:2rem}}

/* trámites */
.tabs{display:flex;gap:.8rem;justify-content:center;flex-wrap:wrap;margin-bottom:3.5rem}
.panel{display:grid;grid-template-columns:1fr 1fr;gap:clamp(2rem,5vw,5rem);margin:0 auto;text-align:left;align-items:start}
.req{padding-top:.5rem}.req h3{font-size:clamp(2.2rem,3.5vw,3rem)}.req .label{margin:2rem 0 .8rem}
.req ol{padding-left:1.4rem;display:grid;gap:.7rem;color:var(--ink)}
.formcard{background:#fff;padding:clamp(2rem,3.5vw,3rem);box-shadow:0 14px 40px rgba(74,10,16,.09);border:1px solid rgba(74,10,16,.08)}.formcard h3{margin-bottom:1.4rem}
label{display:block;font-size:.85rem;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:var(--mute);margin-bottom:1.4rem}
input,select{display:block;width:100%;margin-top:.5rem;border:0;border-bottom:1.5px solid rgba(30,25,23,.3);background:transparent;font:1.2rem var(--sans);color:var(--ink);padding:.7rem 0;border-radius:0}
input:focus,select:focus{outline:0;border-bottom-color:var(--red)}
label small{display:block;font-size:1rem;letter-spacing:0;text-transform:none;margin-top:.6rem;font-weight:400}
.chk{display:flex;align-items:center;gap:.6rem;font-size:.95rem;letter-spacing:0;text-transform:none;font-weight:400}
.chk input{width:auto;margin:0}
.ok{margin-top:1rem;padding:.9rem 1rem;background:#e3f0e6;color:#17382a;font-size:.95rem}
@media(max-width:860px){.panel{grid-template-columns:1fr}}

/* medios */
.media{display:grid;grid-template-columns:1fr 1fr;gap:clamp(2rem,5vw,5rem);margin:3rem auto 0;background:var(--wine);color:#fff;padding:clamp(2rem,6vw,5.5rem);text-align:left;box-shadow:0 30px 70px rgba(74,10,16,.25)}
.media .h2{margin-bottom:1.5rem;color:#fff}.media p{margin-bottom:1.1rem;color:#f6e8e5}.media .soft{color:#e8cfcb}
.media ul{list-style:none;padding:0;align-self:center}
.media li{border-top:1px solid rgba(255,255,255,.3);padding:1.2rem 0 1rem}
.media li h3{color:#fff}
.media li p{margin:0;font-size:1.15rem;color:#f0d9d6;line-height:1.7}
.h2.light{color:#fff}
.faq{display:grid;grid-template-columns:repeat(4,1fr);gap:2.5rem;margin:3rem auto 0;text-align:left;color:var(--mute);font-size:1.15rem;line-height:1.8}
@media(max-width:1000px){.media{grid-template-columns:1fr;gap:2rem}.faq{grid-template-columns:1fr 1fr}}
@media(max-width:560px){.faq{grid-template-columns:1fr}}

/* obra */
.obra{display:grid;grid-template-columns:1.1fr 1fr;gap:clamp(2rem,4vw,4rem);margin:0 auto;align-items:stretch;text-align:left}
.obra img{width:100%;height:100%;min-height:520px;object-fit:cover;box-shadow:0 30px 70px rgba(74,10,16,.2)}
.give{background:#fff;padding:clamp(2rem,3.5vw,3.2rem);box-shadow:0 14px 40px rgba(74,10,16,.09);border:1px solid rgba(74,10,16,.08)}.give h3{margin-bottom:.6rem}
.give button:not(.pill){font:600 1.05rem var(--sans);padding:.85rem .5rem;background:#fff;border:1.5px solid #cdb8ad;cursor:pointer;color:var(--ink);transition:all .2s}
.give button:not(.pill):hover{border-color:var(--wine)}
.give button.on{background:var(--wine);border-color:var(--wine);color:#fff}
.g2,.g4,.g3{display:grid;gap:.7rem;margin-top:.9rem}
.g2{grid-template-columns:1fr 1fr;margin-top:1.6rem}.g4{grid-template-columns:repeat(4,1fr)}.g3{grid-template-columns:1.3fr 1fr 1fr}
@media(max-width:860px){.obra{grid-template-columns:1fr}.obra img{min-height:320px;aspect-ratio:4/3}}

/* historia */
.gallery{display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(1rem,2vw,2rem);margin:0 auto}
.gallery img{width:100%;aspect-ratio:3/4;object-fit:cover;transition:transform .5s;box-shadow:0 20px 50px rgba(74,10,16,.15)}
.gallery img:hover{transform:scale(1.03)}
.gallery img:nth-child(2){margin-top:3rem}
@media(max-width:700px){.gallery{grid-template-columns:1fr}.gallery img:nth-child(2){margin-top:0}.gallery img{aspect-ratio:4/3}}

footer{background:var(--wine);color:#fff;text-align:center;padding:5rem 1.5rem 4rem}
footer svg{margin:0 auto 1rem;color:#f6cfc9}
footer h2{font:500 clamp(2.4rem,5vw,3.8rem)/1.15 var(--serif);color:#fff}
footer p{color:#f0d9d6}
footer nav{display:flex;gap:2rem;justify-content:center;flex-wrap:wrap;margin-top:1.5rem;font-size:.85rem;font-weight:500;letter-spacing:.18em;text-transform:uppercase}
footer nav a:hover{text-decoration:underline;text-underline-offset:6px}

/* ---- brand, header tools ---- */
:root{--gold:#b8893a;--gold-l:#e3b866}
.bar{grid-template-columns:auto 1fr auto;gap:1.5rem}
.bar-c{justify-content:center}
.brand{display:flex;align-items:center;gap:.8rem;font:500 1.25rem/1.05 var(--serif);letter-spacing:.03em;text-transform:none}
.brand svg{flex:none}
.bar-r{display:flex;align-items:center;gap:1.1rem;justify-self:end}
.bar-r button{background:none;border:0;color:inherit;font:inherit;letter-spacing:inherit;text-transform:inherit;cursor:pointer}
.abtn{border:1.5px solid currentColor!important;border-radius:999px;padding:.3rem .85rem;font-weight:700!important;letter-spacing:0!important}
.give-link{border:1.5px solid currentColor;border-radius:999px;padding:.4rem 1rem}
@media(max-width:1200px){.bar-c{display:none}.bar{padding-inline:1.25rem}}
@media(max-width:560px){.give-link{display:none}.brand{font-size:1.05rem}}

/* ---- faith ornaments ---- */
.hero-in .mark{margin:0 auto 1.2rem;color:var(--gold-l);filter:drop-shadow(0 2px 10px rgba(0,0,0,.5))}
.orn{display:flex;align-items:center;gap:1rem;margin:.2rem auto 1.6rem;color:var(--gold);max-width:260px}
.orn span{flex:1;height:1px;background:linear-gradient(90deg,transparent,var(--gold))}
.orn span:last-child{transform:scaleX(-1)}
.verse{background:var(--wine) radial-gradient(circle at 50% 0,rgba(184,137,58,.28),transparent 65%);color:#fff;text-align:center;padding-block:clamp(4rem,8vw,6.5rem)}
.verse svg{color:var(--gold-l);margin:0 auto 1.4rem}
.verse blockquote{font:italic 500 clamp(1.9rem,3.8vw,3.3rem)/1.25 var(--serif);max-width:920px;margin:0 auto 1.2rem;color:#fff}
.verse cite{font-size:.9rem;letter-spacing:.18em;text-transform:uppercase;color:var(--gold-l);font-style:normal;font-weight:600}
.polaroid.main{border-radius:999px 999px 0 0}
.main img{border-radius:999px 999px 0 0}
.saint img{border-radius:999px 999px 0 0;outline:2px solid var(--gold);outline-offset:14px}
footer svg{color:var(--gold-l)}

/* ---- envelope opening ---- */
.env{display:grid;align-items:end;margin-top:4.5rem}
.env>img{grid-area:1/1;align-self:end;transition:opacity .9s ease,transform 1.2s cubic-bezier(.2,.8,.2,1)}
.e-open{opacity:0;transform:translateY(26px) scale(.95)}
.env.open .e-open{opacity:1;transform:none}
.env.open .e-closed{opacity:0;transform:translateY(-18px) scale(1.03)}
.env .card{opacity:0;top:40%;transition:opacity .9s .55s,top 1.3s .45s cubic-bezier(.2,.8,.2,1)}
.env.open .card{opacity:1;top:22%}
.env .seal{transition:transform .7s,opacity .5s}
.env:not(.open) .seal{animation:pulse 2.2s ease-in-out infinite}
.env.open .seal{opacity:0;transform:scale(.3) rotate(50deg)}
.hint{position:absolute;top:-2.8rem;left:0;right:0;text-align:center;font-size:.95rem;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:#fff;text-shadow:0 2px 10px rgba(0,0,0,.6)}
@keyframes pulse{50%{transform:scale(1.12)}}
@media(prefers-reduced-motion:reduce){.env:not(.open) .seal{animation:none}}

/* modal */
.overlay{position:fixed;inset:0;z-index:60;background:rgba(0,0,0,.65);display:grid;place-items:center;padding:1rem}
.modal{position:relative;background:#fff;color:var(--ink);width:min(100%,460px);padding:2.4rem;max-height:92vh;overflow:auto}
.modal h3{margin-bottom:1.2rem}
.modal .x{color:var(--ink)}
@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}.ring{animation:none}*{transition:none!important}}
`;