import GraphUnendingLine from './GraphUnendingLine';
import GraphSpirograph from './GraphMakeYourOwn';
import GraphWhatDoYouSee from './GraphWhatDoYouSee';

import './graphcontainer.css'


export default function GraphContainer() {
  const graphOneTitle: string = 'The Unending Line'
  const graphTwoTitle: string = 'What do you percieve?'
  const graphMakeYourOwn: string = 'Design your own'

  return (
    <>
      <div className="graph-container-grid">
        <GraphUnendingLine graphTitle={graphOneTitle}></GraphUnendingLine>
        <GraphWhatDoYouSee graphTitle={graphTwoTitle}></GraphWhatDoYouSee>
      </div> 
      <div className="makeyourown-container">
        <GraphSpirograph graphTitle={graphMakeYourOwn}></GraphSpirograph>
      </div>
    </>


  );
}