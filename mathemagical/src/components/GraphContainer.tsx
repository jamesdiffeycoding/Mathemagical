import GraphOne from './GraphOne';
import GraphTwo from './GraphTwo';
import GraphZThree from './GraphZThree';

import './graphcontainer.css'


export default function GraphContainer() {
  return (
    <>
      <div className="graph-container-grid">
        <GraphOne></GraphOne>
        <GraphTwo></GraphTwo>
      </div> 
      <div className="makeyourown-container">
        <GraphZThree></GraphZThree>
      </div>
    </>


  );
}