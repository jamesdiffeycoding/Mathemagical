import GraphUnendingLine from './GraphUnendingLine';
import './graphcontainer.css'


export default function GraphContainer() {
  const graphOneTitle: string = '"The Unending Line"'
  
  return (
    <>
      <div className="graph-container-grid">
        <GraphUnendingLine graphTitle={graphOneTitle}></GraphUnendingLine>
      </div> 
    </>


  );
}