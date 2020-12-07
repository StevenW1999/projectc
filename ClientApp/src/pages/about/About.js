// import React, { Component } from 'react';
// import './About.css';
// import { Container, Jumbotron } from 'react-bootstrap';
// import img from '../../images/Biodiversity.jpg'
// import img2 from '../../images/tree.png'

// class About extends Component {
//   render() {
//     return (
//       <div className="Container">
//         <Jumbotron fluid className="Jimbotron">
//           <Container>
//             <h1>Over Ons</h1>
//           </Container>
//         </Jumbotron>
//         <div className="section1">
//           <div class="grid-container">
//             <div class="Image">
//             <img className="img2" src={img} alt="img" />
//             </div>
//             <div class="Text">
//               <div class="Title"><h1>Dit zij wij</h1></div>
//               <div class="Detail">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
//             </div>
//             <div class="Useless"></div>
//             <div class="Useless2"></div>
//           </div>
//         </div>
//         <div className="section2">
//           <div class="grid-container2">
//             <div class="More">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
//             <div class="GoalTitle"><h1>OUR GOALS</h1></div>
//             <div class="goal-container">
//               <div className="c1">
//                 <div class="card">
//                 <img src={img} alt="Avatar" />
//                   <div class="cardcontainer">
//                     <h4><b>Biodiversity</b></h4>
//                   </div>
//                 </div>
//               </div>
//               <div className="c2">
//                 <div class="card">
//                 <img src={img} alt="Avatar" />
//                   <div class="cardcontainer">
//                     <h4><b>Biodiversity</b></h4>
//                   </div>
//                 </div>
//               </div>
//               <div className="c3">
//                 <div class="card">
//                   <img src={img} alt="Avatar" />
//                   <div class="cardcontainer">
//                     <h4><b>Biodiversity</b></h4>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default About;

import React from 'react';
import HeroSection from '../../components/HeroSection';
import { aboutObjOne, aboutObjTwo, aboutObjThree, aboutObjFour } from './Data';

function About() {
  return (
    <>
      <HeroSection {...aboutObjOne} />
      <HeroSection {...aboutObjTwo} />
      <HeroSection {...aboutObjThree} />
      <HeroSection {...aboutObjFour} />
    </>
  );
}

export default About;