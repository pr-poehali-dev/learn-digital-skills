import { useState } from "react";
import Icon from "@/components/ui/icon";

const MENU_ITEMS = [
  {
    id: 1,
    name: "КРАСНОДАР КЛАССИК",
    desc: "Двойной смэш из кубанской говядины, фирменный соус, хрустящие огурцы, лук на бриоши.",
    price: 490,
    tag: "Хит продаж",
    tagColor: "var(--primary)",
    img: "https://cdn.poehali.dev/projects/e39bab55-fd9c-49cf-a87b-3d20adc95010/files/1ea4a740-165e-4b09-b6f4-3d4a76b54390.jpg",
    category: "Бургеры",
  },
  {
    id: 2,
    name: "ОГНЕННЫЙ ЧИКЕН",
    desc: "Хрустящая курица в пряной панировке, халапеньо, соус срирача-мёд, салат айсберг.",
    price: 420,
    tag: "Острое",
    tagColor: "var(--secondary)",
    img: "https://cdn.poehali.dev/projects/e39bab55-fd9c-49cf-a87b-3d20adc95010/files/188fbf40-ea5b-461b-9df9-9ffdd4a65e6d.jpg",
    category: "Бургеры",
  },
  {
    id: 3,
    name: "ДАБЛ СМЭШ + ФРАЙС",
    desc: "Двойной бургер с жареным луком и золотистой картошкой фри в металлической корзинке.",
    price: 650,
    tag: "Сет",
    tagColor: "var(--accent)",
    tagTextColor: "var(--dark)",
    img: "https://cdn.poehali.dev/projects/e39bab55-fd9c-49cf-a87b-3d20adc95010/files/137d170f-f8b8-4a01-874e-cab3c4514524.jpg",
    category: "Сеты",
  },
  {
    id: 4,
    name: "ВЕГГИ КРАСНОДАР",
    desc: "Котлета из нута и свёклы, авокадо-крем, вяленые томаты, микрозелень на цельнозерновой булке.",
    price: 390,
    tag: "Вегетарианское",
    tagColor: "#22c55e",
    img: "https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=600&q=80",
    category: "Бургеры",
  },
  {
    id: 5,
    name: "КАРТОШКА ФРИ",
    desc: "Хрустящая картошка с морской солью, соус на выбор: кетчуп, майонез или барбекю.",
    price: 180,
    tag: "Гарнир",
    tagColor: "#f59e0b",
    img: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80",
    category: "Гарниры",
  },
  {
    id: 6,
    name: "МОЛОЧНЫЙ ШЕЙК",
    desc: "Клубничный, шоколадный или ваниль — густой, холодный, настоящий американский.",
    price: 290,
    tag: "Напитки",
    tagColor: "#ec4899",
    img: "https://images.unsplash.com/photo-1568901839119-631418a3910d?auto=format&fit=crop&w=600&q=80",
    category: "Напитки",
  },
];

const CATEGORIES = ["Все", "Бургеры", "Сеты", "Гарниры", "Напитки"];

type CartItem = { id: number; name: string; price: number; qty: number };

export default function Index() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Все");
  const [orderForm, setOrderForm] = useState({ name: "", phone: "", address: "", comment: "" });

  const totalItems = cart.reduce((s, i) => s + i.qty, 0);
  const totalPrice = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const addToCart = (item: (typeof MENU_ITEMS)[0]) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      if (existing) return prev.map((c) => (c.id === item.id ? { ...c, qty: c.qty + 1 } : c));
      return [...prev, { id: item.id, name: item.name, price: item.price, qty: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === id);
      if (existing && existing.qty > 1) return prev.map((c) => (c.id === id ? { ...c, qty: c.qty - 1 } : c));
      return prev.filter((c) => c.id !== id);
    });
  };

  const getQty = (id: number) => cart.find((c) => c.id === id)?.qty || 0;

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderSuccess(true);
    setCart([]);
    setOrderForm({ name: "", phone: "", address: "", comment: "" });
    setTimeout(() => {
      setOrderSuccess(false);
      setCartOpen(false);
    }, 3500);
  };

  const filtered = activeCategory === "Все" ? MENU_ITEMS : MENU_ITEMS.filter((i) => i.category === activeCategory);

  return (
    <>
      <div className="grain-overlay" />

      {/* Cart Sidebar */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/40" onClick={() => setCartOpen(false)} />
          <div
            style={{
              width: "100%",
              maxWidth: "420px",
              background: "var(--bg)",
              borderLeft: "var(--border)",
              display: "flex",
              flexDirection: "column",
              height: "100vh",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "24px",
                borderBottom: "var(--border)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "white",
              }}
            >
              <span style={{ fontFamily: "Unbounded, sans-serif", fontWeight: 800, fontSize: "20px" }}>
                КОРЗИНА {totalItems > 0 && `(${totalItems})`}
              </span>
              <button onClick={() => setCartOpen(false)} style={{ background: "none", border: "none", cursor: "pointer" }}>
                <Icon name="X" size={24} />
              </button>
            </div>

            {orderSuccess ? (
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "40px 24px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: 80,
                    height: 80,
                    background: "var(--accent)",
                    border: "var(--border)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "24px",
                  }}
                >
                  <Icon name="Check" size={40} />
                </div>
                <h3 style={{ fontFamily: "Unbounded, sans-serif", fontSize: "24px", fontWeight: 800, marginBottom: 12 }}>
                  ЗАКАЗ ПРИНЯТ!
                </h3>
                <p style={{ color: "#666", lineHeight: 1.6 }}>
                  Мы перезвоним через 5 минут для подтверждения. Готовим только из свежих кубанских продуктов!
                </p>
              </div>
            ) : (
              <>
                <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px" }}>
                  {cart.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "60px 0", color: "#888" }}>
                      <Icon name="ShoppingBag" size={48} />
                      <p style={{ marginTop: 16, fontWeight: 700 }}>Корзина пуста</p>
                      <p style={{ fontSize: 14, marginTop: 8 }}>Добавьте что-нибудь из меню</p>
                    </div>
                  ) : (
                    <>
                      {cart.map((item) => (
                        <div
                          key={item.id}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "12px 0",
                            borderBottom: "2px solid #eee",
                          }}
                        >
                          <div style={{ flex: 1 }}>
                            <p style={{ fontWeight: 700, fontSize: 14 }}>{item.name}</p>
                            <p style={{ color: "var(--primary)", fontWeight: 800, fontSize: 14 }}>
                              {item.price * item.qty} ₽
                            </p>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              style={{
                                width: 32,
                                height: 32,
                                border: "var(--border)",
                                background: "white",
                                fontWeight: 800,
                                fontSize: 18,
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              −
                            </button>
                            <span style={{ fontWeight: 800, minWidth: 20, textAlign: "center" }}>{item.qty}</span>
                            <button
                              onClick={() => addToCart(MENU_ITEMS.find((m) => m.id === item.id)!)}
                              style={{
                                width: 32,
                                height: 32,
                                border: "var(--border)",
                                background: "var(--accent)",
                                fontWeight: 800,
                                fontSize: 18,
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      ))}

                      <div
                        style={{
                          marginTop: 16,
                          padding: "16px",
                          background: "var(--dark)",
                          color: "white",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span style={{ fontWeight: 700 }}>ИТОГО:</span>
                        <span style={{ fontFamily: "Unbounded, sans-serif", fontWeight: 800, fontSize: 20 }}>
                          {totalPrice} ₽
                        </span>
                      </div>
                    </>
                  )}
                </div>

                {cart.length > 0 && (
                  <form onSubmit={handleOrder} style={{ padding: "16px 24px", borderTop: "var(--border)", background: "white" }}>
                    <p style={{ fontWeight: 800, fontSize: 13, textTransform: "uppercase", marginBottom: 12 }}>
                      Оформить заказ
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      <input
                        required
                        placeholder="Ваше имя"
                        value={orderForm.name}
                        onChange={(e) => setOrderForm({ ...orderForm, name: e.target.value })}
                        style={{
                          padding: "10px 12px",
                          border: "var(--border)",
                          background: "var(--bg)",
                          fontFamily: "Montserrat, sans-serif",
                          fontWeight: 600,
                          fontSize: 13,
                          outline: "none",
                        }}
                      />
                      <input
                        required
                        placeholder="Телефон"
                        type="tel"
                        value={orderForm.phone}
                        onChange={(e) => setOrderForm({ ...orderForm, phone: e.target.value })}
                        style={{
                          padding: "10px 12px",
                          border: "var(--border)",
                          background: "var(--bg)",
                          fontFamily: "Montserrat, sans-serif",
                          fontWeight: 600,
                          fontSize: 13,
                          outline: "none",
                        }}
                      />
                      <input
                        placeholder="Адрес доставки (или самовывоз)"
                        value={orderForm.address}
                        onChange={(e) => setOrderForm({ ...orderForm, address: e.target.value })}
                        style={{
                          padding: "10px 12px",
                          border: "var(--border)",
                          background: "var(--bg)",
                          fontFamily: "Montserrat, sans-serif",
                          fontWeight: 600,
                          fontSize: 13,
                          outline: "none",
                        }}
                      />
                      <textarea
                        placeholder="Комментарий к заказу"
                        value={orderForm.comment}
                        onChange={(e) => setOrderForm({ ...orderForm, comment: e.target.value })}
                        rows={2}
                        style={{
                          padding: "10px 12px",
                          border: "var(--border)",
                          background: "var(--bg)",
                          fontFamily: "Montserrat, sans-serif",
                          fontWeight: 600,
                          fontSize: 13,
                          outline: "none",
                          resize: "none",
                        }}
                      />
                      <button
                        type="submit"
                        className="btn-cta"
                        style={{ background: "var(--primary)", color: "white", width: "100%", marginTop: 4 }}
                      >
                        Заказать на {totalPrice} ₽
                      </button>
                    </div>
                  </form>
                )}
              </>
            )}
          </div>
        </div>
      )}

      <header className="header">
        <div className="logo">КРАСНОДАР*БУРГЕР</div>
        <nav>
          <a href="#menu">Меню</a>
          <a href="#about">О нас</a>
          <a href="#contacts">Адрес</a>
        </nav>
        <button
          className="btn-cta"
          onClick={() => setCartOpen(true)}
          style={{ display: "flex", alignItems: "center", gap: 8, position: "relative" }}
        >
          <Icon name="ShoppingCart" size={16} />
          Заказать
          {totalItems > 0 && (
            <span
              style={{
                position: "absolute",
                top: -8,
                right: -8,
                background: "var(--primary)",
                color: "white",
                borderRadius: "50%",
                width: 20,
                height: 20,
                fontSize: 11,
                fontWeight: 800,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid var(--dark)",
              }}
            >
              {totalItems}
            </span>
          )}
        </button>
      </header>

      <main>
        <section className="hero">
          <div className="hero-content">
            <h1 className="hero-title">
              НАСТОЯЩИЙ
              <br />
              <span>КРАСНОДАР</span>
              <br />
              В БУРГЕРЕ
            </h1>
            <p className="text-base md:text-lg lg:text-xl mb-8 md:mb-10 leading-relaxed text-[#555]">
              Смэш-бургеры из кубанской говядины, хрустящая курица и крафтовые соусы. Доставка по Краснодару и самовывоз.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
              <button
                className="btn-cta"
                style={{ background: "var(--primary)", color: "white" }}
                onClick={() => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })}
              >
                Смотреть меню
              </button>
              <button className="btn-cta" onClick={() => setCartOpen(true)}>
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Icon name="ShoppingCart" size={16} />
                  Заказать сейчас
                </span>
              </button>
            </div>
          </div>
          <div
            className="hero-img"
            style={{
              backgroundImage: `url(https://cdn.poehali.dev/projects/e39bab55-fd9c-49cf-a87b-3d20adc95010/files/1ea4a740-165e-4b09-b6f4-3d4a76b54390.jpg)`,
            }}
          >
            <div className="sticker">
              СВЕЖЕЕ
              <br />
              КАЖДЫЙ ДЕНЬ
            </div>
            <div className="floating-tag hidden md:block" style={{ top: "20%", left: "10%" }}>
              #КРАСНОДАР
            </div>
            <div className="floating-tag hidden md:block" style={{ bottom: "30%", right: "20%" }}>
              ВКУСНО!
            </div>
          </div>
        </section>

        <div className="marquee">
          <div className="marquee-content">
            &nbsp; * СМЭШ-БУРГЕРЫ ИЗ КУБАНСКОЙ ГОВЯДИНЫ * ДОСТАВКА ПО КРАСНОДАРУ * ОТКРЫТЫ ЕЖЕДНЕВНО 11:00–23:00 *
            ХРУСТЯЩАЯ КУРИЦА * КРАФТОВЫЕ СОУСЫ * ЛУЧШИЕ БУРГЕРЫ КРАСНОДАРА * СМЭШ-БУРГЕРЫ ИЗ КУБАНСКОЙ ГОВЯДИНЫ *
            ДОСТАВКА ПО КРАСНОДАРУ * ОТКРЫТЫ ЕЖЕДНЕВНО 11:00–23:00 * ХРУСТЯЩАЯ КУРИЦА * КРАФТОВЫЕ СОУСЫ
          </div>
        </div>

        {/* MENU SECTION */}
        <section className="section-padding" id="menu">
          <div className="section-header">
            <h2 className="section-title">НАШЕ МЕНЮ</h2>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: "8px 16px",
                    border: "var(--border)",
                    background: activeCategory === cat ? "var(--dark)" : "white",
                    color: activeCategory === cat ? "white" : "var(--dark)",
                    fontWeight: 800,
                    fontSize: 12,
                    textTransform: "uppercase",
                    cursor: "pointer",
                    transition: "0.2s",
                    boxShadow: activeCategory === cat ? "4px 4px 0 var(--primary)" : "4px 4px 0 var(--dark)",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="menu-grid">
            {filtered.map((item) => {
              const qty = getQty(item.id);
              return (
                <div key={item.id} className="menu-card">
                  <span
                    className="menu-tag"
                    style={{
                      background: item.tagColor,
                      color: item.tagTextColor || "white",
                    }}
                  >
                    {item.tag}
                  </span>
                  <img src={item.img} alt={item.name} style={{ width: "100%", height: 220, objectFit: "cover", display: "block" }} />
                  <div className="menu-card-body">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "10px",
                      }}
                    >
                      <h3 style={{ fontSize: 15 }}>{item.name}</h3>
                      <span className="price">{item.price} ₽</span>
                    </div>
                    <p style={{ fontSize: "14px", color: "#666", marginBottom: 16 }}>{item.desc}</p>

                    {qty === 0 ? (
                      <button
                        className="btn-cta"
                        onClick={() => addToCart(item)}
                        style={{ width: "100%", background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
                      >
                        <Icon name="Plus" size={14} />
                        В корзину
                      </button>
                    ) : (
                      <div style={{ display: "flex", alignItems: "center", gap: 0, border: "var(--border)", overflow: "hidden" }}>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          style={{
                            flex: 1,
                            padding: "10px",
                            border: "none",
                            background: "white",
                            fontWeight: 800,
                            fontSize: 18,
                            cursor: "pointer",
                            borderRight: "var(--border)",
                          }}
                        >
                          −
                        </button>
                        <span style={{ flex: 1, textAlign: "center", fontWeight: 800, fontSize: 16 }}>{qty}</span>
                        <button
                          onClick={() => addToCart(item)}
                          style={{
                            flex: 1,
                            padding: "10px",
                            border: "none",
                            background: "var(--accent)",
                            fontWeight: 800,
                            fontSize: 18,
                            cursor: "pointer",
                            borderLeft: "var(--border)",
                          }}
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {totalItems > 0 && (
            <div style={{ textAlign: "center", marginTop: 40 }}>
              <button
                className="btn-cta"
                onClick={() => setCartOpen(true)}
                style={{
                  background: "var(--primary)",
                  color: "white",
                  fontSize: 16,
                  padding: "16px 40px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <Icon name="ShoppingCart" size={20} />
                Оформить заказ · {totalPrice} ₽
              </button>
            </div>
          )}
        </section>

        {/* ABOUT */}
        <section className="retro-vibe" id="about">
          <div>
            <h2 className="vibe-title">ВАЙБ-ЧЕК ПРОЙДЕН.</h2>
            <p className="vibe-text">
              Мы готовим смэш-бургеры только из свежего кубанского мяса. Никаких заморозок — только живые котлеты, хрустящая
              булка и соусы собственного производства. Краснодар, ты заслуживаешь лучшего!
            </p>
            <button
              className="btn-cta"
              style={{ background: "var(--dark)", color: "white", borderColor: "white" }}
              onClick={() => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })}
            >
              Перейти в меню
            </button>
          </div>
          <div
            className="vibe-img"
            style={{
              backgroundImage: `url(https://cdn.poehali.dev/projects/e39bab55-fd9c-49cf-a87b-3d20adc95010/files/6631cd6d-73ca-499a-9ad5-1d21ceff3ce6.jpg)`,
            }}
          ></div>
        </section>

        {/* GALLERY */}
        <section className="section-padding">
          <h2 className="section-title" style={{ marginBottom: "40px", textAlign: "center" }}>
            @KRASNODAR.BURGER
          </h2>
          <div className="social-grid">
            <div className="social-item">
              <img
                src="https://cdn.poehali.dev/projects/e39bab55-fd9c-49cf-a87b-3d20adc95010/files/1ea4a740-165e-4b09-b6f4-3d4a76b54390.jpg"
                alt="Краснодар Классик"
              />
            </div>
            <div className="social-item">
              <img
                src="https://cdn.poehali.dev/projects/e39bab55-fd9c-49cf-a87b-3d20adc95010/files/188fbf40-ea5b-461b-9df9-9ffdd4a65e6d.jpg"
                alt="Огненный Чикен"
              />
            </div>
            <div className="social-item">
              <img
                src="https://cdn.poehali.dev/projects/e39bab55-fd9c-49cf-a87b-3d20adc95010/files/137d170f-f8b8-4a01-874e-cab3c4514524.jpg"
                alt="Дабл Смэш"
              />
            </div>
            <div className="social-item">
              <img
                src="https://cdn.poehali.dev/projects/e39bab55-fd9c-49cf-a87b-3d20adc95010/files/6631cd6d-73ca-499a-9ad5-1d21ceff3ce6.jpg"
                alt="Атмосфера"
              />
            </div>
          </div>
        </section>
      </main>

      <footer id="contacts">
        <div>
          <div className="footer-logo">КРАСНОДАР*БУРГЕР</div>
          <p style={{ color: "#666", lineHeight: 1.6 }}>
            Смэш-бургеры из кубанской говядины. Доставка и самовывоз по Краснодару.
          </p>
          <div style={{ marginTop: 16, display: "flex", gap: 12 }}>
            <button
              className="btn-cta"
              onClick={() => setCartOpen(true)}
              style={{ background: "var(--primary)", color: "white", display: "flex", alignItems: "center", gap: 8 }}
            >
              <Icon name="ShoppingCart" size={14} />
              Заказать
            </button>
          </div>
        </div>
        <div className="footer-links">
          <h4>Навигация</h4>
          <ul>
            <li>
              <a href="#menu" style={{ color: "inherit", textDecoration: "none" }}>
                Меню
              </a>
            </li>
            <li>
              <a href="#about" style={{ color: "inherit", textDecoration: "none" }}>
                О нас
              </a>
            </li>
            <li>
              <a href="#contacts" style={{ color: "inherit", textDecoration: "none" }}>
                Контакты
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-links">
          <h4>Часы работы</h4>
          <ul>
            <li>Пн–Пт: 11:00 – 23:00</li>
            <li>Сб–Вс: 11:00 – 00:00</li>
          </ul>
        </div>
        <div className="footer-links">
          <h4>Контакты</h4>
          <ul>
            <li>
              <a href="tel:+78612000000" style={{ color: "inherit", textDecoration: "none" }}>
                +7 (861) 200-00-00
              </a>
            </li>
            <li>г. Краснодар</li>
            <li>ул. Красная, 1</li>
          </ul>
        </div>
      </footer>
    </>
  );
}
