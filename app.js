const { useState, useEffect, useRef } = React;

// ===== EDITE AQUI =====
const NOME = "Sua Academia";
const WA = "5500000000000"; // DDI + DDD + número
const ENDERECO = "Rua Exemplo, 123 - Sua Cidade";
const IMG = { hero: "", sobre: "", passos: "", gal: [] }; // URLs de fotos (opcional)
// ======================

const LINK = `https://wa.me/${WA}?text=${encodeURIComponent("Olá! Quero agendar minha experiência.")}`;
const bg = (u) => (u ? { backgroundImage: `url(${u})` } : undefined);
const NAV = [["Diferenciais","diferenciais"],["Modalidades","modalidades"],["Aplicativo","aplicativo"],["Depoimentos","depoimentos"],["Espaço","espaco"],["Horários","horarios"],["Localização","localizacao"]];
const DIFS = [
  ["cal","10 anos","de história e experiência no mercado fitness"],
  ["star","NPS de excelência","entre as academias mais bem avaliadas do mundo pelos próprios alunos"],
  ["ok","Premiada","reconhecida pelo Prêmio Excellence em 2021, 2022 e 2025"],
  ["user","Atendimento sob medida","atenção individual e de alto nível para cada aluno"],
  ["heart","Time especializado","profissionais formados e focados em saúde"],
];
const MODS = [
  ["Body & Mind","Alongamento, respiração e foco para equilibrar corpo e mente.","47,123,255"],
  ["Muay Thai","Luta que une técnica, condicionamento e confiança.","0,162,255"],
  ["Core Training","Fortalecimento do centro do corpo para postura e estabilidade.","29,99,255"],
  ["Programa Teens","Treino seguro e divertido, pensado para adolescentes.","90,208,255"],
];
const APP = [
  ["dumb","Reservas nas aulas coletivas","Escolha o seu lugar na aula direto pelo mapa do estúdio."],
  ["act","Acompanhamento dos treinos","Baixe os exercícios e veja a descrição de cada aula e treino."],
  ["ok","Comemore seus resultados","Acompanhe a sua evolução individual na palma da mão."],
];
const PASSOS = [
  ["ok","Faça a sua matrícula."],
  ["cal","Agende a avaliação inicial, com check-up e o primeiro planejamento de treino."],
  ["act","Entre no programa de 90 dias, nosso acompanhamento individual."],
  ["heart","Aproveite uma vida saudável, com bem-estar físico e mental."],
];
const DEPO = ["Carlos Mendes","Ana Paula","Roberto Lima","Marina Souza","Juliana Costa"];
const HORA = [["Segunda a sexta","05:30 – 22:30"],["Sábado","08:00 – 14:00"],["Domingo e feriados","08:00 – 12:00"]];

const P = {
  play: <polygon points="7 4 20 12 7 20" />,
  wa: <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8z" />,
  pin: <><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></>,
  clock: <><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></>,
  cal: <><rect x="3" y="4" width="18" height="18" rx="3" /><path d="M16 2v4M8 2v4M3 10h18" /></>,
  act: <path d="M22 12h-4l-3 9L9 3l-3 9H2" />,
  ok: <><path d="M22 11v1a10 10 0 1 1-6-9.2" /><path d="M22 4 12 14l-3-3" /></>,
  heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />,
  star: <path d="m12 2 3 6.5 7 .9-5.2 4.8 1.4 7L12 17.8 5.8 21.2l1.4-7L2 9.4l7-.9z" />,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  x: <path d="M6 6l12 12M18 6 6 18" />,
  dumb: <path d="M6 8v8M3 10v4M18 8v8M21 10v4M6 12h12" />,
};
const Ic = ({ n, s = 22 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{P[n]}</svg>
);
const Cta = () => (
  <div className="cc" data-r="1"><a className="bt p" href={LINK}><Ic n="wa" s={18} />Quero agendar minha experiência</a></div>
);
const Ey = ({ t }) => <span className="ey" data-r="1">{t}</span>;

function App() {
  const [sc, setSc] = useState(false);
  const [open, setOpen] = useState(false);
  const bar = useRef(null);
  const root = useRef(null);

  useEffect(() => {
    const f = () => {
      const h = document.documentElement, m = h.scrollHeight - h.clientHeight;
      if (bar.current) bar.current.style.transform = `scaleX(${m > 0 ? window.scrollY / m : 0})`;
      setSc(window.scrollY > 140);
    };
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  useEffect(() => {
    const els = root.current.querySelectorAll("[data-r]");
    if (!("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("in")); return; }
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    }), { threshold: 0.12 });
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);

  const d = (i) => ({ "data-r": 1, style: { "--d": i * 80 + "ms" } });

  return (
    <div ref={root} id="top">
      <div className="pg" ref={bar} />
      <header className="hd">
        <a href="#top" className="lg"><span className="lm"><Ic n="dumb" s={20} /></span>{NOME}</a>
        <nav className="nv" aria-label="Principal">{NAV.map(([t, i]) => <a key={i} href={"#" + i}>{t}</a>)}</nav>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <a className="bt p" href={LINK}><Ic n="wa" s={16} />Agendar</a>
          <button className="mb" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}><Ic n={open ? "x" : "menu"} /></button>
        </div>
      </header>
      {open && <nav className="dr pn" onClick={() => setOpen(false)}>{NAV.map(([t, i]) => <a key={i} href={"#" + i}>{t}</a>)}</nav>}
      <a className={"bt p fab" + (sc ? " on" : "")} href={LINK} aria-label="Chamar no WhatsApp"><Ic n="wa" s={18} />WhatsApp</a>

      <main>
        <section className="hero">
          <span className="bl b1" /><span className="bl b2" />
          <div className="w">
            <div className="hp pn">
              <div>
                <span className="ey" {...d(0)}>Academia e bem-estar</span>
                <h1 {...d(1)}>Bem-estar físico e mental de <span className="gr">alto padrão</span></h1>
                <p className="mu" {...d(2)}>Cada pessoa tem o seu ritmo. Por isso criamos uma experiência completa e personalizada para cuidar da sua saúde.</p>
                <div className="bs" {...d(3)}>
                  <a className="bt p" href={LINK}><Ic n="wa" s={18} />Quero agendar minha experiência</a>
                  <a className="bt" href="#modalidades">Ver modalidades</a>
                </div>
              </div>
              <div className="hv" style={bg(IMG.hero)} {...d(2)}>{!IMG.hero && <Ic n="dumb" s={120} />}</div>
            </div>
          </div>
        </section>

        <section className="sec" id="diferenciais">
          <div className="w">
            <Ey t="(01) Diferenciais" />
            <h2 data-r="1">Por que treinar com a gente</h2>
            <div className="fx">
              {DIFS.map(([i, t, p], k) => (
                <div className="cd pn" key={t} {...d(k % 3)}>
                  <div className="ic"><Ic n={i} /></div>
                  <h3>{t}</h3><p>{p}</p>
                </div>
              ))}
            </div>
            <Cta />
          </div>
        </section>

        <section className="sec" id="modalidades">
          <div className="w">
            <Ey t="(02) Modalidades" />
            <h2 data-r="1">Modalidades</h2>
            <p className="mu" data-r="1">Aulas para todos os perfis, do alongamento à luta.</p>
            <div className="gd">
              {MODS.map(([t, p, g], k) => (
                <article className="md pn" key={t} style={{ "--g": g }} {...d(k)}>
                  <span className="pl">0{k + 1}</span>
                  <h3>{t}</h3><p>{p}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="sec" id="aplicativo">
          <div className="w sp">
            <div className="phs" data-r="1" aria-hidden="true">
              <div className="ph a"><i /><u /><u /><i /><u /><u /></div>
              <div className="ph b"><u /><div className="rg" style={{ "--p": 82 }}>82</div><i /><u /><u /></div>
            </div>
            <div>
              <Ey t="(03) Aplicativo" />
              <h2 data-r="1">App exclusivo para acompanhar sua <span className="gr">evolução</span></h2>
              <div className="ls">
                {APP.map(([i, t, p], k) => (
                  <div className="it" key={t} {...d(k)}>
                    <div className="ic"><Ic n={i} /></div>
                    <div><h3>{t}</h3><p>{p}</p></div>
                  </div>
                ))}
              </div>
              <div data-r="1"><a className="bt p" href={LINK}><Ic n="wa" s={18} />Quero agendar minha experiência</a></div>
            </div>
          </div>
        </section>

        <section className="sec">
          <div className="w sp">
            <div>
              <Ey t="(04) Como funciona" />
              <h2 data-r="1">Juntos até o seu <span className="gr">objetivo</span></h2>
              <div className="ls">
                {PASSOS.map(([i, t], k) => (
                  <div className="it" key={t} {...d(k)}>
                    <div className="ic"><Ic n={i} /></div>
                    <div><p style={{ color: "var(--fg)" }}>{t}</p></div>
                  </div>
                ))}
              </div>
              <div data-r="1"><a className="bt p" href={LINK}><Ic n="wa" s={18} />Quero agendar minha experiência</a></div>
            </div>
            <div className="im" style={bg(IMG.passos)} data-r="1">{!IMG.passos && <Ic n="heart" s={96} />}</div>
          </div>
        </section>

        <section className="sec" id="depoimentos">
          <div className="w">
            <Ey t="(05) Depoimentos" />
            <h2 data-r="1">Depoimentos</h2>
            <div className="vs">
              {DEPO.map((n, k) => (
                <button className="vd" key={n} aria-label={"Assistir depoimento de " + n} {...d(k % 3)}>
                  <span className="c"><Ic n="play" s={24} /></span><b>{n}</b>
                </button>
              ))}
            </div>
            <Cta />
          </div>
        </section>

        <section className="sec" id="espaco">
          <div className="w">
            <div className="sp">
              <div className="tx">
                <Ey t="(06) Espaço" />
                <h2 data-r="1">Sobre a <span className="gr">{NOME}</span></h2>
                <p data-r="1">Nosso treino é híbrido e se adapta ao que você precisa, longe da rotina repetitiva e monótona das academias comuns.</p>
                <p data-r="1">Tudo começa com o <b>Check-up Saúde</b> (exclusivo): 90 dias de acompanhamento próximo com um especialista, que ajusta cada detalhe do seu planejamento para melhorar seus resultados.</p>
                <p data-r="1">A estrutura é <b>moderna</b> e pensada para o seu conforto e conveniência no dia a dia.</p>
                <p data-r="1">Aqui é um lugar para <b>cultivar relacionamentos</b> que vão além da parceria entre aluno e academia.</p>
              </div>
              <div className="im" style={bg(IMG.sobre)} data-r="1">{!IMG.sobre && <Ic n="dumb" s={96} />}</div>
            </div>
            <div className="gl">
              {[...Array(6)].map((_, k) => (
                <div className="tl" key={k} style={bg(IMG.gal[k])} {...d(k % 3)}>Espaço {k + 1}</div>
              ))}
            </div>
          </div>
        </section>

        <section className="sec" id="horarios">
          <div className="w">
            <Ey t="(07) Horários e localização" />
            <h2 data-r="1">Venha nos visitar</h2>
            <div className="two">
              <div className="pn" id="localizacao" {...d(0)}>
                <div className="ic"><Ic n="clock" /></div>
                <h3>Horários</h3>
                {HORA.map(([a, b]) => <div className="rw" key={a}><span className="mu">{a}</span><span>{b}</span></div>)}
              </div>
              <div className="pn" {...d(1)}>
                <div className="ic"><Ic n="pin" /></div>
                <h3>Localização</h3>
                <p className="mu" style={{ marginBottom: 24 }}>{ENDERECO}</p>
                <a className="bt p" href={"https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(ENDERECO)} target="_blank" rel="noreferrer"><Ic n="pin" s={18} />Como chegar</a>
              </div>
            </div>
            <Cta />
          </div>
        </section>
      </main>
      <footer className="fo">© {new Date().getFullYear()} {NOME}. Todos os direitos reservados.</footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
