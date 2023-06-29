export default function ImagePopup(props){
  return(
    <div className={`popup popup__image ${ props.card.link ? "popup_opened" : "" }`}>
      <figure className="popup__figure">
        <img className="popup__big-image" src={props.card.link} alt={props.card.name} />
        <figcaption className="popup__title">{props.card.name}</figcaption>
        <button className="popup__close" type="button" onClick={props.onClose}></button>
      </figure>
    </div>
  )
}