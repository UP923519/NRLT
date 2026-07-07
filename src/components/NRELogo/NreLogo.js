import image from "../../assets/nre-logo.png";

export default function NreLogo() {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className="NRLogo">
        <img src={image} alt="powered by National Rail Enquiries" width="256" />
      </div>
    </div>
  );
}
