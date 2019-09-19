import React from 'react';

export default function Hero() {
  return (

    <section className="hero is-link is-fullheight-with-navbar is-primary is-bold">
  <div className="hero-body">
    <div className="container is-horizontal-center">
      <a href="https://zabbleinc.com/">
        <img className = "image" src={require("./zabblelogo.png")} alt="conserve energy" />
      </a>
    </div>
  </div>
</section>

  )
}
