import React, { useEffect, useMemo, useState } from "react";
import {
  HeartHandshake, Heart, Search, Menu, X, ArrowRight, Play, Share2, ShieldCheck,
  Plus, LayoutDashboard, Users, HandHeart, Settings, Pencil, Trash2, Eye,
  Upload, Video, Image as ImageIcon, CheckCircle2, Copy, ExternalLink, ChevronRight,
  Wallet, CircleHelp, LogOut
} from "lucide-react";

const seed = [
  {
    id: "mama-amelia-llc",
    name: "Ajude a Mama Amélia a receber tratamento especializado na Índia",
    patient: "Mama Amélia",
    age: "",
    location: "Moçambique · Tratamento médico na Índia",
    category: "Tratamento médico especializado",
    goal: 1390000,
    raised: 400000,
    donors: 0,
    status: "Activa",
    verified: false,
    image: "/mama-amelia.png",
    video: "",
    short: "Mama Amélia vive com Leucemia Linfocítica Crónica (LLC) e precisa urgentemente de tratamento especializado no estrangeiro.",
    story: "A Mama Amélia foi diagnosticada com Leucemia Linfocítica Crónica (LLC) em 2023.\n\nActualmente, luta contra níveis muito baixos de plaquetas, o que lhe causa hemorragias. A sua condição exige cuidados médicos especializados e acompanhamento urgente.\n\nEla precisa de tratamento especializado na Índia para estabilizar a sua saúde. O valor angariado nesta campanha será destinado aos cuidados médicos especializados na Índia.\n\nCada contribuição é importante. Ao apoiar esta campanha, ajuda a aproximar a Mama Amélia dos cuidados de que necessita.",
    created: "2026-11-11"
  }
];

const money = n => new Intl.NumberFormat("pt-MZ", { maximumFractionDigits: 0 }).format(Number(n || 0)) + " MT";
const load = () => {
  try { const v = JSON.parse(localStorage.getItem("infinity-care-campaigns-v3")); return Array.isArray(v) ? v : seed; }
  catch { return seed; }
};

function Brand({ light = false }) {
  return <div className={`brand ${light ? "brand-light" : ""}`}>
    <div className="brand-mark"><HeartHandshake size={24}/></div>
    <div><strong>Infinity Care</strong><span>UMA VIDA. UMA ESPERANÇA.</span></div>
  </div>;
}

function Progress({ raised, goal }) {
  const pct = Math.min(100, Math.round((Number(raised || 0) / Math.max(1, Number(goal || 1))) * 100));
  return <div className="progress-wrap"><div className="progress-track"><div className="progress-fill" style={{width: `${pct}%`}} /></div><div className="progress-meta"><b>{pct}% alcançado</b><span>{money(raised)} de {money(goal)}</span></div></div>;
}

function App() {
  const [campaigns, setCampaigns] = useState(load);
  const [page, setPage] = useState("home");
  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState("");
  const [admin, setAdmin] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [notice, setNotice] = useState("");
  const [donation, setDonation] = useState(null);

  useEffect(() => localStorage.setItem("infinity-care-campaigns-v3", JSON.stringify(campaigns)), [campaigns]);
  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(() => setNotice(""), 3500);
    return () => clearTimeout(t);
  }, [notice]);

  const activeCampaigns = campaigns.filter(c => c.status === "Activa");
  const filtered = useMemo(() => activeCampaigns.filter(c =>
    `${c.name} ${c.patient} ${c.location} ${c.category}`.toLowerCase().includes(query.toLowerCase())
  ), [activeCampaigns, query]);

  const openCampaign = c => { setSelected(c); setPage("campaign"); setAdmin(false); window.scrollTo(0,0); };
  const goHome = () => { setPage("home"); setSelected(null); setAdmin(false); window.scrollTo(0,0); };
  const saveCampaign = c => {
    setCampaigns(prev => prev.some(x => x.id === c.id) ? prev.map(x => x.id === c.id ? c : x) : [c, ...prev]);
    setNotice("Campanha guardada com sucesso.");
  };
  const deleteCampaign = id => {
    if (window.confirm("Queres eliminar esta campanha?")) {
      setCampaigns(prev => prev.filter(c => c.id !== id));
      setNotice("Campanha eliminada.");
    }
  };

  return <div className="app-shell">
    <header className="site-header">
      <div className="header-inner">
        <button className="logo-button" onClick={goHome}><Brand /></button>
        <nav className={mobileMenu ? "nav open" : "nav"}>
          <button onClick={goHome}>Início</button>
          <button onClick={() => {setPage("home"); setMobileMenu(false); document.getElementById("campaigns")?.scrollIntoView({behavior:"smooth"});}}>Campanhas</button>
          <button onClick={() => {setPage("about"); setMobileMenu(false);}}>Como funciona</button>
        </nav>
        <div className="header-actions">
          <button className="admin-link" onClick={() => {setAdmin(true); setPage("admin"); setMobileMenu(false);}}><LayoutDashboard size={16}/> Administração</button>
          <button className="mobile-toggle" aria-label="Abrir menu" onClick={() => setMobileMenu(!mobileMenu)}>{mobileMenu ? <X/> : <Menu/>}</button>
        </div>
      </div>
    </header>

    {page === "home" && <main>
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line"/> SOLIDARIEDADE QUE TRANSFORMA</div>
          <h1>Uma pequena ajuda pode mudar <em>uma vida inteira.</em></h1>
          <p>Conheça histórias reais. Apoie quem precisa. Seja parte da esperança de alguém.</p>
          <div className="hero-actions"><button className="btn btn-gold" onClick={() => document.getElementById("campaigns")?.scrollIntoView({behavior:"smooth"})}>Quero ajudar <ArrowRight size={17}/></button><button className="text-button" onClick={() => setPage("about")}>Como funciona <ChevronRight size={16}/></button></div>
          <div className="trust-note"><ShieldCheck size={17}/> Transparência e cuidado em cada contribuição</div>
        </div>
        <div className="hero-visual">
          <div className="hero-photo"><img src="/mama-amelia.png" alt="Mama Amélia" /></div>
          <div className="hero-float"><div className="float-icon"><Heart size={18} fill="currentColor"/></div><div><b>Um gesto de amor</b><span>pode fazer a diferença.</span></div></div>
          <div className="hero-stamp">JUNTOS<br/>PELA VIDA</div>
        </div>
      </section>

      <section className="impact-strip">
        <div><strong>{activeCampaigns.length.toString().padStart(2,"0")}</strong><span>Campanhas activas</span></div>
        <div><strong>{money(activeCampaigns.reduce((s,c)=>s+Number(c.raised||0),0))}</strong><span>Contribuições registadas*</span></div>
        <div><strong>100%</strong><span>Feito para facilitar a ajuda</span></div>
        <small>*Valores demonstrativos nesta versão inicial.</small>
      </section>

      <section className="campaign-section" id="campaigns">
        <div className="section-heading">
          <div><div className="eyebrow">HISTÓRIAS QUE PRECISAM DE SI</div><h2>Escolha uma causa.<br/><em>Faça a diferença.</em></h2></div>
          <div className="search-box"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Pesquisar campanhas"/></div>
        </div>
        <div className="campaign-grid">
          {filtered.map(c => <CampaignCard key={c.id} campaign={c} onClick={() => openCampaign(c)}/>)}
          {!filtered.length && <div className="empty-state">Não encontrámos campanhas com essa pesquisa.</div>}
        </div>
      </section>

      <section className="how-section">
        <div className="how-intro"><div className="eyebrow">SIMPLES. HUMANO. DIRECTO.</div><h2>Ajudar nunca<br/>foi tão <em>simples.</em></h2><p>Não precisa de muitos passos para fazer a diferença. Escolha uma história e contribua com o valor que puder.</p></div>
        <div className="steps">
          <div className="step"><span>01</span><div><b>Conheça a história</b><p>Leia a biografia e veja as informações da campanha.</p></div></div>
          <div className="step"><span>02</span><div><b>Escolha o valor</b><p>Contribua com o montante que estiver ao seu alcance.</p></div></div>
          <div className="step"><span>03</span><div><b>Faça a transferência</b><p>Copie o NIB da empresa, transfira pelo seu e-banking e envie o comprovativo pelo WhatsApp.</p></div></div>
        </div>
      </section>
      <Callout onClick={() => setPage("about")}/>
    </main>}

    {page === "campaign" && selected && <CampaignDetail campaign={campaigns.find(c=>c.id===selected.id) || selected} onBack={goHome} onDonate={c=>setDonation(c)} onShare={()=>{navigator.clipboard?.writeText(window.location.href);setNotice("Ligação copiada. Partilhe esta campanha.");}}/>}

    {page === "about" && <main className="about-page">
      <div className="eyebrow">SOBRE A INFINITY CARE</div><h1>Solidariedade com <em>transparência.</em></h1>
      <p className="about-lead">A Infinity Care aproxima pessoas que precisam de apoio médico de pessoas dispostas a ajudar. Queremos tornar a contribuição simples, clara e acessível.</p>
      <div className="about-cards"><div><ShieldCheck/><h3>Confiança</h3><p>As campanhas devem ser analisadas antes de serem publicadas.</p></div><div><HeartHandshake/><h3>Humanidade</h3><p>Cada campanha conta uma história e merece ser tratada com respeito.</p></div><div><Wallet/><h3>Transparência</h3><p>Os valores angariados e a sua utilização devem ser comunicados com clareza.</p></div></div>
      <div className="notice-box"><b>Importante</b><p>A Infinity Care deve publicar apenas campanhas autorizadas e documentadas. Esta versão é um protótipo: ainda não processa pagamentos nem valida documentos.</p></div>
      <button className="btn btn-green" onClick={goHome}>Ver campanhas <ArrowRight size={16}/></button>
    </main>}

    {page === "admin" && <Admin campaigns={campaigns} onSave={saveCampaign} onDelete={deleteCampaign} onExit={goHome} notice={setNotice}/>}

    <footer className="footer">
      <div className="footer-main"><Brand light/><p>Uma vida. Uma esperança.<br/>A solidariedade aproxima-nos.</p><a className="footer-contact footer-whatsapp" href="https://wa.me/258826878270" target="_blank" rel="noreferrer"><CircleHelp size={17}/> Dúvidas? Fale connosco<br/><b>WhatsApp: 826 878 270</b></a></div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Infinity Care. Todos os direitos reservados.</span><span>Solidariedade com transparência.</span></div>
    </footer>

    {donation && <DonationModal campaign={donation} onClose={()=>setDonation(null)} onNotice={setNotice}/>}
    {notice && <div className="toast"><CheckCircle2 size={18}/>{notice}</div>}
  </div>;
}

function CampaignCard({campaign:c,onClick}) {
  const pct = Math.min(100, Math.round(c.raised / Math.max(1,c.goal)*100));
  return <article className="campaign-card">
    <button className="card-image" onClick={onClick}><img src={c.image || "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=900&q=80"} alt={`Campanha de ${c.patient}`}/><span className="card-category">{c.category}</span></button>
    <div className="card-body">
      <div className="card-location">{c.location}</div><h3>{c.name}</h3><p>{c.short}</p>
      <div className="card-progress"><Progress raised={c.raised} goal={c.goal}/></div>
      <div className="card-bottom"><span><Users size={15}/>{c.donors || 0} pessoas ajudaram</span><button onClick={onClick}>Apoiar <ArrowRight size={15}/></button></div>
    </div>
  </article>;
}

function CampaignDetail({campaign:c,onBack,onDonate,onShare}) {
  const [tab,setTab] = useState("story");
  return <main className="detail-page">
    <button className="back-link" onClick={onBack}>← Voltar às campanhas</button>
    <div className="detail-layout">
      <div className="detail-main">
        <div className="detail-image"><img src={c.image} alt={`Fotografia de ${c.patient}`}/>{c.video && <a className="video-link" href={c.video} target="_blank" rel="noreferrer"><Play fill="currentColor"/> Ver vídeo da campanha</a>}</div>
        <div className="detail-title"><div className="card-location">{c.location} · {c.category}</div><h1>{c.name}</h1><div className="patient-meta">{c.patient} · {c.age} {c.verified && <span><ShieldCheck size={15}/> Campanha verificada</span>}</div></div>
        <div className="detail-tabs"><button className={tab==="story"?"active":""} onClick={()=>setTab("story")}>A história</button><button className={tab==="updates"?"active":""} onClick={()=>setTab("updates")}>Actualizações</button></div>
        {tab==="story" ? <div className="story-text"><p className="story-lead">{c.short}</p><p>{c.story}</p><div className="story-callout">A sua contribuição, por menor que seja, é um gesto de esperança.</div></div> : <div className="empty-updates">Ainda não foram publicadas actualizações para esta campanha.</div>}
      </div>
      <aside className="donation-panel">
        <div className="panel-label">OBJECTIVO DA CAMPANHA</div><div className="panel-raised">{money(c.raised)}</div><div className="panel-muted">angariados de {money(c.goal)}</div><div className="panel-muted">Faltam {money(Math.max(0, Number(c.goal || 0) - Number(c.raised || 0)))}</div>
        <Progress raised={c.raised} goal={c.goal}/>
        <div className="donor-count"><Users size={17}/>{c.donors || 0} pessoas já contribuíram</div>
        <button className="btn btn-gold full" onClick={()=>onDonate(c)}>Fazer uma doação <Heart size={17}/></button>
        <button className="share-button" onClick={onShare}><Share2 size={16}/> Partilhar campanha</button>
        <div className="secure-note"><ShieldCheck size={17}/><span>Ajude com confiança. Consulte as informações da campanha antes de contribuir.</span></div>
      </aside>
    </div>
  </main>;
}

function DonationModal({campaign:c,onClose,onNotice}) {
  const [amount,setAmount] = useState("500");
  const [custom,setCustom] = useState("");
  const [name,setName] = useState("");
  const [copied,setCopied] = useState(false);
  const value = amount === "other" ? Number(custom) : Number(amount);
  const nib = "000800009031623210195";
  const copyNib = async () => {
    try {
      await navigator.clipboard.writeText(nib);
      setCopied(true);
      onNotice("NIB copiado. Já pode colá-lo no seu e-banking.");
      setTimeout(() => setCopied(false), 2500);
    } catch {
      onNotice("Não foi possível copiar automaticamente. Seleccione o NIB e copie-o manualmente.");
    }
  };
  const whatsapp = `https://wa.me/258826878270?text=${encodeURIComponent(`Olá. Fiz uma doação para a campanha de ${c.patient}${value ? ` no valor de ${money(value)}` : ""}. Envio o comprovativo em anexo.`)}`;
  return <div className="modal-backdrop" onMouseDown={e=>e.target===e.currentTarget&&onClose()}>
    <div className="donation-modal">
      <button className="modal-close" onClick={onClose}><X/></button>
      <div className="eyebrow">UM GESTO DE ESPERANÇA</div><h2>Faça a sua <em>doação.</em></h2><p className="modal-sub">Está a apoiar: <b>{c.patient}</b></p>
      <label>Escolha o valor que deseja doar (opcional)</label>
      <div className="amount-grid">{["100","250","500","1000"].map(v=><button type="button" className={amount===v?"selected":""} onClick={()=>{setAmount(v);setCustom("");}} key={v}>{v} MT</button>)}</div>
      <input className="field" placeholder="Outro valor (MT)" value={custom} onChange={e=>{setCustom(e.target.value);setAmount("other");}}/>
      <div className="bank-transfer-card">
        <div className="bank-transfer-heading"><Wallet size={19}/><b>Transferência bancária</b></div>
        <div className="bank-detail"><span>Nome da empresa</span><strong>Ntsume</strong></div>
        <div className="bank-detail"><span>Banco</span><strong>BCI</strong></div>
        <div className="bank-detail"><span>NIB</span><strong className="nib-value">{nib}</strong></div>
        <button type="button" className="btn btn-green full copy-nib" onClick={copyNib}><Copy size={16}/>{copied?"NIB copiado":"Copiar NIB"}</button>
        <p className="bank-instructions">Copie o NIB e cole-o no seu e-banking para efectuar a transferência. Confirme os dados antes de autorizar a operação.</p>
      </div>
      <label>O seu nome (opcional)</label><input className="field" value={name} onChange={e=>setName(e.target.value)} placeholder="Nome"/>
      <div className="proof-note"><b>Depois de transferir</b><p>Envie o comprovativo da transferência pelo WhatsApp para confirmarmos a sua contribuição.</p></div>
      <a className="btn btn-green full whatsapp-proof" href={whatsapp} target="_blank" rel="noreferrer">Enviar comprovativo pelo WhatsApp <ArrowRight size={16}/></a>
      <small className="demo-warning">A doação só será contabilizada após confirmação do comprovativo.</small>
    </div>
  </div>;
}

function Callout({onClick}) {
  return <section className="callout"><div><div className="eyebrow">A SUA AJUDA TEM VALOR</div><h2>Não precisa de muito<br/>para fazer <em>muito.</em></h2><p>Escolha uma campanha e ajude alguém a dar o próximo passo.</p></div><button className="btn btn-gold" onClick={onClick}>Conhecer a Infinity Care <ArrowRight size={17}/></button></section>;
}

function Admin({campaigns,onSave,onDelete,onExit,notice}) {
  const [editing,setEditing] = useState(null);
  const [showForm,setShowForm] = useState(false);
  const blank = {id:"",name:"",patient:"",age:"",location:"Maputo, Moçambique",category:"Tratamento médico",goal:"",raised:0,donors:0,status:"Activa",verified:false,image:"",video:"",short:"",story:""};
  const startNew = () => {setEditing({...blank,id:`camp-${Date.now()}`});setShowForm(true);};
  const startEdit = c => {setEditing({...c});setShowForm(true);};
  const update = (key,value) => setEditing(p=>({...p,[key]:value}));
  const submit = e => {e.preventDefault();onSave({...editing,goal:Number(editing.goal),raised:Number(editing.raised||0),donors:Number(editing.donors||0)});setShowForm(false);setEditing(null);};
  const total = campaigns.reduce((s,c)=>s+Number(c.raised||0),0);
  return <main className="admin-page">
    <div className="admin-top"><div><div className="eyebrow">ÁREA RESTRITA · PROTÓTIPO</div><h1>Painel de <em>administração.</em></h1><p>Gira as campanhas e actualize as informações publicadas.</p></div><button className="btn btn-outline" onClick={onExit}><Eye size={16}/> Ver site público</button></div>
    <div className="admin-stats"><div><span>Campanhas</span><b>{campaigns.length}</b></div><div><span>Campanhas activas</span><b>{campaigns.filter(c=>c.status==="Activa").length}</b></div><div><span>Valores registados*</span><b>{money(total)}</b></div></div>
    <div className="admin-list-head"><div><h2>Campanhas</h2><p>Crie, edite ou remova campanhas.</p></div><button className="btn btn-green" onClick={startNew}><Plus size={17}/> Nova campanha</button></div>
    {showForm && editing && <form className="editor-form" onSubmit={submit}>
      <div className="editor-head"><h2>{campaigns.some(c=>c.id===editing.id)?"Editar campanha":"Nova campanha"}</h2><button type="button" className="icon-button" onClick={()=>setShowForm(false)}><X/></button></div>
      <div className="form-grid">
        <div className="form-field span-2"><label>Título da campanha *</label><input value={editing.name} onChange={e=>update("name",e.target.value)} required placeholder="Ex.: Ajude a Maria a continuar o tratamento"/></div>
        <div className="form-field"><label>Nome do doente *</label><input value={editing.patient} onChange={e=>update("patient",e.target.value)} required/></div>
        <div className="form-field"><label>Idade</label><input value={editing.age} onChange={e=>update("age",e.target.value)} placeholder="Ex.: 8 anos"/></div>
        <div className="form-field"><label>Localização</label><input value={editing.location} onChange={e=>update("location",e.target.value)}/></div>
        <div className="form-field"><label>Categoria</label><select value={editing.category} onChange={e=>update("category",e.target.value)}><option>Tratamento médico</option><option>Cirurgia</option><option>Medicação</option><option>Exames médicos</option><option>Reabilitação</option></select></div>
        <div className="form-field"><label>Meta (MT) *</label><input type="number" min="1" value={editing.goal} onChange={e=>update("goal",e.target.value)} required/></div>
        <div className="form-field"><label>Valor angariado (MT)</label><input type="number" min="0" value={editing.raised} onChange={e=>update("raised",e.target.value)}/></div>
        <div className="form-field span-2"><label>Fotografia por URL</label><input value={editing.image} onChange={e=>update("image",e.target.value)} placeholder="https://..."/><small>Ou carregue uma imagem abaixo (guardada neste navegador).</small><input type="file" accept="image/*" onChange={e=>{const f=e.target.files?.[0];if(f){const r=new FileReader();r.onload=()=>update("image",r.result);r.readAsDataURL(f);}}}/></div>
        <div className="form-field span-2"><label>Vídeo (URL do YouTube ou outro vídeo público)</label><input value={editing.video} onChange={e=>update("video",e.target.value)} placeholder="https://..."/></div>
        <div className="form-field span-2"><label>Resumo da campanha *</label><textarea rows="3" value={editing.short} onChange={e=>update("short",e.target.value)} required/></div>
        <div className="form-field span-2"><label>Biografia / história completa *</label><textarea rows="6" value={editing.story} onChange={e=>update("story",e.target.value)} required/></div>
        <div className="form-field"><label>Estado</label><select value={editing.status} onChange={e=>update("status",e.target.value)}><option>Activa</option><option>Em análise</option><option>Concluída</option><option>Suspensa</option></select></div>
        <div className="form-field checkbox-field"><label><input type="checkbox" checked={!!editing.verified} onChange={e=>update("verified",e.target.checked)}/> Campanha verificada</label><small>Marque apenas após validar os documentos.</small></div>
      </div>
      <div className="editor-actions"><button type="button" className="btn btn-outline" onClick={()=>setShowForm(false)}>Cancelar</button><button className="btn btn-green" type="submit">Guardar campanha</button></div>
    </form>}
    <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Campanha</th><th>Meta</th><th>Angariado*</th><th>Estado</th><th>Acções</th></tr></thead><tbody>
      {campaigns.map(c=><tr key={c.id}><td><div className="table-campaign"><img src={c.image} alt=""/><div><b>{c.patient}</b><span>{c.name}</span></div></div></td><td>{money(c.goal)}</td><td>{money(c.raised)}</td><td><span className={`status ${c.status==="Activa"?"status-active":""}`}>{c.status}</span></td><td><div className="table-actions"><button title="Editar" onClick={()=>startEdit(c)}><Pencil size={16}/></button><button title="Eliminar" onClick={()=>onDelete(c.id)}><Trash2 size={16}/></button></div></td></tr>)}
    </tbody></table></div>
    <p className="admin-disclaimer">* Os valores desta versão são editados manualmente. O painel ainda não está protegido por autenticação e os dados ficam guardados apenas no navegador utilizado.</p>
  </main>;
}

export default App;