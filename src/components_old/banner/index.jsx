import { Image } from "antd";

function Banner() {
  return (
    <>
      <div id="header-temple-banner">
        <Image
          src="aaimata.jpeg"
          id="aaimata-mandir"
          alt="shree-aai-mata-ji"
          className="shree-aai-mata-mandir"
          height={"100%"}
          width={180}
        ></Image>
        <div id="aai-mata-description">
          <div id="header-subheadings">
            <p className="header-subheadings-pt">|| श्री गणेशाय नमः ||</p>
            <Image src="ganpati.jpeg" width={100} height={100}></Image>
            <p className="header-subheadings-pt">|| श्री आईजी प्रसादत ||</p>
          </div>
          <h1 id="aai-mata-description-h">
            श्री सिरवी समाज कर्नाटक ट्रस्ट बालेपेटे बैंगलोर
          </h1>
          <div id="aai-mata-mandir-contact">
            <p className="aai-mata-mandir-contact-para">9880681107</p>
            <p className="aai-mata-mandir-contact-para">9845400324</p>
          </div>
          <div id="contact-time-info">
            <p>
              संपर्क करने का टाइम <span>10AM - 12PM (सभी दिन) </span>
            </p>
            <p>
              ऑफिस में मिलने का समय <span>9AM - 2PM (रविवार) </span>
            </p>
          </div>
          <div className="aai-mata-mandir-address">
            <p> एसकेआर लेन, बलेपेट, चिकपेट बेंगलुरु कर्नाटक 560053</p>
          </div>
        </div>
      </div>
      <div className="marquee">
        <div className="marquee--inner">
          <span className="marquee-inner-span">
            <div>
              सेवा उपलब्ध करने का एक प्रयास जिससे आपको सिर्वी समाज के विवाह
              योग्य लड़के लड़किया की जानकारी एकमित्र कर समाज के कार्यालय में
              उपलब्ध कराइ जाएगी
            </div>
          </span>
          <span className="marquee-inner-span">
            <div>
              सभी भाइयो से निवेदन नम्र निवेदन है की इस सेवा की जानकारी समाज के
              ज्यादा से ज्यादा परिवारों में उपलब्ध करने मेंअपना अमूल्य योगदान दे
              .
            </div>
          </span>
        </div>
      </div>
    </>
  );
}

export default Banner;
