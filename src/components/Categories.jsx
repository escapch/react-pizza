function Categories({ value, onCategoryClick }) {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categories.map((li, i) => {
          return (
            <li onClick={() => onCategoryClick(i)} className={value === i ? 'active' : ''} key={i}>
              {li}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
export default Categories;
