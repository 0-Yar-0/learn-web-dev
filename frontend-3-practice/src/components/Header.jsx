export default function Header() { return <> <a className="skip-link" href="#booking">Перейти к записи</a>
<header className="site-header container">
  <a className="brand" href="#booking" aria-label="Контур — запись">КОНТУР</a>
  <nav className="main-nav" aria-label="Главная навигация">
    <a href="#service-summary">Услуги</a><a href="#master-name">Мастера</a><a href="#client-review">Отзывы</a><a href="#salon-contacts">Контакты</a>
  </nav><a className="button button--primary header-booking" href="#booking">Записаться</a>
</header> </>; }
