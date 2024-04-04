// import Graph from './Graph';
import GraphUnendingLine from './GraphUnendingLine';
import './graphcontainer.css'


export default function GraphContainer() {
  const graphOneTitle: string = '"The Unending Line"'
  
  return (
    <>
    <hr></hr>
      <div className="graph-container-grid">
        <GraphUnendingLine graphTitle={graphOneTitle}></GraphUnendingLine>
        {/* <Graph title={'Coming soon'}></Graph> */}
        {/* <Graph title={'"The unending line"'}></Graph> */}
        {/* <Graph title={'"The unending line"'}></Graph> */}
      </div> 

    </>


  );
}