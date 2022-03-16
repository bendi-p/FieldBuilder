function Button(props) {
  return (
    <button className={props.className} onClick={props.callBack}>{props.label}</button>
  );
}

export default Button;