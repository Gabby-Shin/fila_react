function SectionTitle({ description, eyebrow, id, title }) {
  return (
    <div className="section-title">
      <span>{eyebrow}</span>
      <h2 id={id}>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

export default SectionTitle;
