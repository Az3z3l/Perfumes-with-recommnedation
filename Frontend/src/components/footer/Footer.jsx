const Footer = () => {
  const date=new Date()
  return (
    <footer className="footer">
      <em>Copyright © 2021 SDPerfumerry.lk All Rights Reserved.<br/>Last Updated 30/07/{date.getMonth()}.</em>
      &nbsp;&copy;&nbsp;
    </footer>
  );
};

export default Footer;
