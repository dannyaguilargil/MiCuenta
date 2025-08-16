import error404 from "../../assets/images/error404.jpg";
function Error404() {
  return (
    <div className="text-center w-100">
        <img src={error404} alt="Error 404" style={{maxWidth: "100%", height: "auto" }} className="img-fluid" />
    </div>
  );
}

export default Error404;
