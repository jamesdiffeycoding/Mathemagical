import GraphUnendingLine from './GraphUnendingLine';
import GraphSpirograph from './GraphMakeYourOwn';
import GraphOpticsLungs from './GraphOpticLungs';

import './graphcontainer.css'
import GraphOpticLungs from './GraphOpticLungs';


export default function GraphContainer() {
  const graphOneTitle: string = 'The Unending Line'
  const graphTwoTitle: string = 'What do you percieve?'
  const graphMakeYourOwn: string = 'Design your own'

  return (
    <>
      <div className="graph-container-grid">
        <GraphUnendingLine graphTitle={graphOneTitle}></GraphUnendingLine>
        <GraphOpticLungs graphTitle={graphTwoTitle}></GraphOpticLungs>
      </div> 
      <div className="makeyourown-container">
        <GraphSpirograph graphTitle={graphMakeYourOwn}></GraphSpirograph>
      </div>
    </>


  );
}