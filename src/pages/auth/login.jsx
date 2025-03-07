import React, { useEffect, useRef } from "react";

function Login() {
  const shapeRef = useRef(null);

  useEffect(() => {
    const shape = shapeRef.current;
    let position = 300; // Start off-screen (increase for more offset)
    const speed = 1; // Speed of animation

    function slideIn() {
      if (position > 120) {  // Target final position from your CSS (.screen__background__shape1 { right: 120px; })
        position -= speed;
        shape.style.right = `${position}px`;
        requestAnimationFrame(slideIn);
      }
    }

    slideIn();
  }, []);

  return (
    <div className="container">
      <div className="screen">
        <div className="screen__content">
          <form className="login">
            <div className="login__field">
              <i className="login__icon fas fa-user"></i>
              <input type="text" className="login__input" placeholder="User name / Email" />
            </div>
            <div className="login__field">
              <i className="login__icon fas fa-lock"></i>
              <input type="password" className="login__input" placeholder="Password" />
            </div>
            <button className="button login__submit">
              <span className="button__text">Log In Now</span>
              <i className="button__icon fas fa-chevron-right"></i>
            </button>
          </form>
        </div>
        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape4"></span>
          <span className="screen__background__shape screen__background__shape3"></span>
          <span className="screen__background__shape screen__background__shape2"></span>
          <span ref={shapeRef} className="screen__background__shape screen__background__shape1" 
                style={{ position: "absolute", right: "300px" }}>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;
