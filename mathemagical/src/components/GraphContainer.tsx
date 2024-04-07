import GraphUnendingLine from './GraphUnendingLine';
import GraphSpirograph from './GraphSpirograph';

import './graphcontainer.css'


export default function GraphContainer() {
  const graphOneTitle: string = '"The Unending Line"'
  const graphTwoTitle: string = '"Spirograph"'
  
  return (
    <>
      <div className="graph-container-grid">
        <GraphUnendingLine graphTitle={graphOneTitle}></GraphUnendingLine>
        <GraphSpirograph graphTitle={graphTwoTitle}></GraphSpirograph>
      </div> 
    </>


  );
}