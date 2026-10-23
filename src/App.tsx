import { useMemo, useState } from 'react'

type Product = { id: number; name: string; category: string; price: number; tone: string; image: string; tag?: string; description: string }

const products: Product[] = [
  { id: 1, name: 'The Sunday Linen Set', category: 'Bedroom', price: 248, tone: 'Oat / natural', tag: 'Bestseller', image: 'photo-1631049307264-da0ec9d70304', description: 'Washed European flax linen, softened slowly for the familiar feel of a well-loved favourite. Includes one duvet cover and two pillowcases.' },
  { id: 2, name: 'Handwoven Table Cloth', category: 'Dining', price: 168, tone: 'Flax / chalk', image: 'photo-1591625591034-75d303d2e1a4', description: 'A quietly tactile table cloth, woven in small batches from a linen-cotton blend. Made for long lunches and everyday dinners alike.' },
  { id: 3, name: 'Bath Towel No. 04', category: 'Bath', price: 64, tone: 'Warm white', tag: 'New colour', image: 'photo-1766727923658-ae4d4d837239', description: 'Generously sized, absorbent Turkish cotton with a soft ribbed edge. Loomed with care and finished for lasting comfort.' },
  { id: 4, name: 'Ridge Stripe Cushion', category: 'Living', price: 92, tone: 'Ink / sand', image: 'photo-1611489704164-6f73c62bd810', description: 'A versatile cushion in a graphic, considered stripe. Woven from sturdy Belgian linen with a feather-down insert.' },
  { id: 5, name: 'Cloud Cotton Throw', category: 'Living', price: 186, tone: 'Undyed cotton', image: 'photo-1600210492486-724fe5c67fb0', description: 'A softly textured layer for the end of the bed or the quiet corner of the sofa. Crafted from breathable organic cotton.' },
  { id: 6, name: 'Dune Linen Pillowcase Pair', category: 'Bedroom', price: 88, tone: 'Ochre / natural', image: 'photo-1616594039964-ae9021a400a0', description: 'Relaxed, breathable linen pillowcases in a sun-warmed ochre. Designed to become softer with every wash.' },
  { id: 7, name: 'Everyday Napkins, Set of 4', category: 'Dining', price: 56, tone: 'Soft olive', image: 'photo-1604578762246-41134e37f9cc', description: 'A set of four naturally rumpled napkins, cut from our enduring mid-weight linen. Each one is finished by hand.' },
  { id: 8, name: 'Studio Hand Towel', category: 'Bath', price: 38, tone: 'Chalk / ink', image: 'photo-1620626011761-996317b8d101', description: 'A daily essential with a little more intention: soft, quick-drying cotton with a clean woven border.' },
]

const imageUrl = (id: string, width = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`

function Icon({ name, size = 20 }: { name: string; size?: number }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true as const }
  if (name === 'search') return <svg {...common}><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 4.5 4.5"/></svg>
  if (name === 'heart') return <svg {...common}><path d="M20.8 8.8c0 5.2-8.8 10-8.8 10s-8.8-4.8-8.8-10a4.6 4.6 0 0 1 8.8-1.7 4.6 4.6 0 0 1 8.8 1.7Z"/></svg>
  if (name === 'bag') return <svg {...common}><path d="M4.5 8h15l1 12h-17l1-12Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/></svg>
  if (name === 'close') return <svg {...common}><path d="m6 6 12 12M18 6 6 18"/></svg>
  if (name === 'arrow') return <svg {...common}><path d="M4 12h15m-6-6 6 6-6 6"/></svg>
  if (name === 'plus') return <svg {...common}><path d="M12 5v14M5 12h14"/></svg>
  return <svg {...common}><path d="M5 12h14"/></svg>
}

function App() {
  const [category, setCategory] = useState('All pieces')
  const [query, setQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [wishlist, setWishlist] = useState<number[]>([])
  const [cart, setCart] = useState<Record<number, number>>({})
  const [selected, setSelected] = useState<Product | null>(null)
  const [drawer, setDrawer] = useState<'cart' | 'saved' | null>(null)
  const [checkout, setCheckout] = useState(false)
  const [ordered, setOrdered] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const categories = ['All pieces', 'Bedroom', 'Living', 'Dining', 'Bath']
  const filtered = useMemo(() => products.filter(p => (category === 'All pieces' || p.category === category) && `${p.name} ${p.category} ${p.tone}`.toLowerCase().includes(query.toLowerCase())), [category, query])
  const cartCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0)
  const cartTotal = products.reduce((sum, p) => sum + p.price * (cart[p.id] || 0), 0)
  const savedProducts = products.filter(p => wishlist.includes(p.id))
  const toggleSaved = (id: number) => setWishlist(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id])
  const addToCart = (id: number) => setCart(current => ({ ...current, [id]: (current[id] || 0) + 1 }))
  const changeQty = (id: number, change: number) => setCart(current => {
    const qty = (current[id] || 0) + change
    if (qty <= 0) { const next = { ...current }; delete next[id]; return next }
    return { ...current, [id]: qty }
  })
  const money = (value: number) => `$${value.toFixed(2)}`

  return <div className="storefront">
    <div className="announcement">A softer kind of everyday <span>—</span> complimentary shipping over $150</div>
    <header className="site-header">
      <button className="wordmark" aria-label="Atelier House home" onClick={() => { setCategory('All pieces'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>ATELIER <span>HOUSE</span></button>
      <nav className={`main-nav ${menuOpen ? 'open' : ''}`} aria-label="Main navigation">
        <a href="#shop" onClick={() => { setCategory('All pieces'); setMenuOpen(false) }}>Shop all</a><a href="#shop" onClick={() => { setCategory('Bedroom'); setMenuOpen(false) }}>Bedroom</a><a href="#story" onClick={() => setMenuOpen(false)}>Our approach</a>
      </nav>
      <button className="mobile-menu" type="button" aria-expanded={menuOpen} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? 'Close' : 'Menu'}</button>
      <div className="header-actions">
        <button className={`icon-button ${searchOpen ? 'is-active' : ''}`} aria-label="Search products" onClick={() => { setSearchOpen(!searchOpen); setTimeout(() => document.getElementById('search-input')?.focus(), 0) }}><Icon name="search" /></button>
        <button className="icon-button saved-action" aria-label={`Saved items, ${wishlist.length}`} onClick={() => { setDrawer('saved'); setCheckout(false) }}><Icon name="heart" />{wishlist.length > 0 && <span className="count">{wishlist.length}</span>}</button>
        <button className="icon-button bag-action" aria-label={`Shopping bag, ${cartCount} items`} onClick={() => { setDrawer('cart'); setCheckout(false) }}><Icon name="bag" /><span className="count">{cartCount}</span></button>
      </div>
    </header>
    {searchOpen && <div className="search-bar"><Icon name="search" size={18} /><input id="search-input" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search considered essentials…" aria-label="Search products" /><button onClick={() => { setQuery(''); setSearchOpen(false) }}>Close</button></div>}
    <main>
      <section className="hero">
        <img src={imageUrl('photo-1616486338812-3dadae4b4ace', 2000)} alt="A sunlit, thoughtfully layered living room in warm natural tones" />
        <div className="hero-wash" />
        <div className="hero-content"><p className="eyebrow">TEXTILES FOR SLOWER LIVING</p><h1>Make room<br />for <em>ritual.</em></h1><p>Natural materials, considered details, and the everyday things worth keeping.</p><a className="button button-dark" href="#shop">Discover the collection <Icon name="arrow" size={17} /></a></div>
        <div className="hero-note"><span>01 / 03</span><span>Quiet mornings, made softer.</span></div>
      </section>
      <section className="intro" id="story"><div className="intro-mark">A/H</div><p>We believe a home is made in the small moments. Our thoughtfully made textiles bring a little more ease to the everyday — designed to be lived in, loved, and passed along.</p><a href="#shop">A note on how we make <Icon name="arrow" size={16} /></a></section>
      <section className="shop-section" id="shop">
        <div className="section-top"><div><p className="eyebrow">THE GOOD THINGS</p><h2>Objects for living</h2></div><p className="product-count">{filtered.length} considered essentials</p></div>
        <div className="shop-controls"><div className="filters" role="group" aria-label="Filter by category">{categories.map(item => <button key={item} className={category === item ? 'filter active' : 'filter'} onClick={() => setCategory(item)}>{item}</button>)}</div>{searchOpen && <span className="search-status">{filtered.length} results</span>}</div>
        {filtered.length ? <div className="product-grid">{filtered.map(product => <article className="product-card" key={product.id}>
          <div className="product-image" onClick={() => setSelected(product)} role="button" tabIndex={0} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelected(product) } }} aria-label={`View ${product.name}`}>
            <img src={imageUrl(product.image)} alt={product.name} loading="lazy" />{product.tag && <span className="product-tag">{product.tag}</span>}
            <button className={`save-button ${wishlist.includes(product.id) ? 'saved' : ''}`} aria-label={`${wishlist.includes(product.id) ? 'Remove' : 'Add'} ${product.name} ${wishlist.includes(product.id) ? 'from' : 'to'} wishlist`} onClick={e => { e.stopPropagation(); toggleSaved(product.id) }}><Icon name="heart" size={19} /></button>
            <button className="quick-add" onClick={e => { e.stopPropagation(); addToCart(product.id) }}>Quick add <Icon name="plus" size={16} /></button>
          </div>
          <div className="product-meta"><div><h3><button onClick={() => setSelected(product)}>{product.name}</button></h3><p>{product.tone}</p></div><span>{money(product.price)}</span></div>
        </article>)}</div> : <div className="empty-results"><p>No pieces found for “{query}”.</p><button onClick={() => { setQuery(''); setCategory('All pieces') }}>Clear filters</button></div>}
        <div className="shop-bottom"><span>Made slowly, in small batches.</span><a href="#shop">Explore all pieces <Icon name="arrow" size={16} /></a></div>
      </section>
      <section className="craft-note"><div className="craft-image"><img src={imageUrl('photo-1600210492486-724fe5c67fb0', 1200)} alt="Textural natural linens styled in a calm bedroom" loading="lazy" /></div><div className="craft-copy"><p className="eyebrow">FEWER, BETTER THINGS</p><h2>Made to soften<br />with time.</h2><p>We partner with family-run mills who share our respect for natural fibres and thoughtful craft. Every piece is designed for the long haul, then made in quantities that make sense.</p><a href="#shop" className="text-link">Get to know our materials <Icon name="arrow" size={16} /></a></div></section>
    </main>
    <footer><div className="footer-top"><a className="wordmark" href="#">ATELIER <span>HOUSE</span></a><p>Thoughtful textiles for a slower, more considered home.</p><a href="mailto:hello@atelierhouse.example">hello@atelierhouse.example</a></div>        <div className="footer-bottom"><span>© 2026 Atelier House Studio · Fictional storefront concept</span><span>Made with intention, wherever you are.</span><a href="#shop">Instagram ↗</a></div></footer>

    {selected && <div className="overlay" role="presentation" onMouseDown={e => e.target === e.currentTarget && setSelected(null)}><section className="product-modal" role="dialog" aria-modal="true" aria-label={`${selected.name} details`}><button className="close-button" aria-label="Close details" onClick={() => setSelected(null)}><Icon name="close" /></button><img src={imageUrl(selected.image, 1200)} alt={selected.name} /><div className="modal-copy"><p className="eyebrow">{selected.category} / ATELIER HOUSE</p><h2>{selected.name}</h2><p className="modal-tone">{selected.tone}</p><p>{selected.description}</p><div className="modal-price">{money(selected.price)}</div><button className="button button-dark full-button" onClick={() => { addToCart(selected.id); setSelected(null); setDrawer('cart') }}>Add to bag <Icon name="arrow" size={17} /></button><button className="modal-save" onClick={() => toggleSaved(selected.id)}><Icon name="heart" size={18} /> {wishlist.includes(selected.id) ? 'Saved to your list' : 'Save for later'}</button><p className="shipping-note">Complimentary shipping on orders over $150. Thoughtfully packed without plastic.</p></div></section></div>}

    {drawer && <div className="overlay drawer-overlay" role="presentation" onMouseDown={e => e.target === e.currentTarget && setDrawer(null)}><aside className="side-drawer" role="dialog" aria-modal="true" aria-label={drawer === 'cart' ? 'Shopping bag' : 'Saved pieces'}>
      <div className="drawer-head"><div><p className="eyebrow">{drawer === 'cart' ? 'YOUR SELECTION' : 'KEPT CLOSE'}</p><h2>{drawer === 'cart' ? 'Your bag' : 'Saved pieces'}</h2></div><button className="close-button" aria-label="Close drawer" onClick={() => setDrawer(null)}><Icon name="close" /></button></div>
      {drawer === 'cart' ? ordered ? <div className="order-success"><div className="success-mark">✓</div><p className="eyebrow">THANK YOU</p><h3>Your order is in good hands.</h3><p>A confirmation is on its way. We’ll take it from here, carefully.</p><button className="button button-dark" onClick={() => { setOrdered(false); setDrawer(null) }}>Continue browsing <Icon name="arrow" size={17} /></button></div> : checkout ? <form className="checkout-form" onSubmit={e => { e.preventDefault(); setOrdered(true); setCart({}) }}><button type="button" className="back-link" onClick={() => setCheckout(false)}>← Back to bag</button><h3>A few details</h3><label>Email address<input type="email" required placeholder="you@example.com" /></label><label>Full name<input required placeholder="Your name" /></label><label>Shipping address<input required placeholder="Street and number" /></label><div className="form-row"><label>City<input required placeholder="City" /></label><label>Postcode<input required placeholder="Postal code" /></label></div><div className="checkout-total"><span>Total</span><strong>{money(cartTotal)}</strong></div><button className="button button-dark full-button" type="submit">Place sample order <Icon name="arrow" size={17} /></button><p className="shipping-note">This is a demo checkout. No payment will be collected.</p></form> : <>{cartCount ? <div className="drawer-items">{products.filter(p => cart[p.id]).map(p => <div className="drawer-item" key={p.id}><img src={imageUrl(p.image, 240)} alt="" /><div className="drawer-item-copy"><h3>{p.name}</h3><p>{p.tone}</p><div className="quantity"><button aria-label={`Remove one ${p.name}`} onClick={() => changeQty(p.id, -1)}><Icon name="minus" size={14} /></button><span>{cart[p.id]}</span><button aria-label={`Add one ${p.name}`} onClick={() => changeQty(p.id, 1)}><Icon name="plus" size={14} /></button><button className="remove-item" onClick={() => setCart(current => { const next = { ...current }; delete next[p.id]; return next })}>Remove</button></div></div><strong>{money(p.price * cart[p.id])}</strong></div>)}</div> : <div className="drawer-empty"><p>Your bag is taking a quiet moment.</p><button className="text-link" onClick={() => setDrawer(null)}>Find something lovely <Icon name="arrow" size={16} /></button></div>}
        {cartCount > 0 && <div className="drawer-footer"><div className="shipping-progress"><span>{cartTotal >= 150 ? 'You have complimentary shipping.' : `You're ${money(150 - cartTotal)} away from complimentary shipping.`}</span><div><i style={{ width: `${Math.min(100, cartTotal / 150 * 100)}%` }} /></div></div><div className="subtotal"><span>Subtotal</span><strong>{money(cartTotal)}</strong></div><p>Taxes and shipping calculated at checkout.</p><button className="button button-dark full-button" onClick={() => setCheckout(true)}>Continue to checkout <Icon name="arrow" size={17} /></button></div>}</> : <>{savedProducts.length ? <div className="drawer-items">{savedProducts.map(p => <div className="drawer-item" key={p.id}><img src={imageUrl(p.image, 240)} alt="" /><div className="drawer-item-copy"><h3>{p.name}</h3><p>{p.tone}</p><button className="saved-add" onClick={() => { addToCart(p.id); setDrawer('cart') }}>Add to bag · {money(p.price)}</button></div><button className="remove-saved" aria-label={`Remove ${p.name} from saved pieces`} onClick={() => toggleSaved(p.id)}><Icon name="close" size={17} /></button></div>)}</div> : <div className="drawer-empty"><p>No saved pieces just yet.</p><button className="text-link" onClick={() => setDrawer(null)}>Browse the collection <Icon name="arrow" size={16} /></button></div>}</>}
    </aside></div>}
  </div>
}

export default App
