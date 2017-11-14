import React,{Component} from "react";
import "./index.css";
import Grid from "./Grid.jsx";



class App extends Component{
    
    constructor(props){
        super(props);
        this.speed=1000/60;
        this.rows =50;
        this.cols = 50;
        this.state= {
            generation:0,
            gridFull: Array(this.rows).fill().map(()=>Array(this.cols).fill(false))
        }
    }
    
    selectBox=(row,col)=>{
       
       let newGrid = JSON.parse(JSON.stringify(this.state.gridFull));
       newGrid[row][col]=!newGrid[row][col];
       this.setState({gridFull:newGrid})
       
        
    }
    
    seed=()=>{
        let newGrid =JSON.parse(JSON.stringify(this.state.gridFull));
        
        for(let i = 1; i< newGrid.length-1 ; i++){
           
            for(let j = 1; j< newGrid[i].length-1 ;j++){
                let choose = Math.floor(Math.random()*3);
                choose === 1? newGrid[i][j] = true : newGrid[i][j]=false;
                
            }
            
        }
        
        
         this.setState({gridFull:newGrid})
       
        
    }
    
    startButton=()=>{
        
       clearInterval(this.intervalID);
        this.intervalID = setInterval(this.game,this.speed);
       
       
    }
    
      stopButton=()=>{
        
       clearInterval(this.intervalID);
       this.setState({generation:0})
       this.seed();
      
       
    }
    
      pause=()=>{
        
       clearInterval(this.intervalID);
       
       
    }
    
    
    game=()=>{
        this.setState({generation:this.state.generation+1})
        let newGrid = JSON.parse(JSON.stringify(this.state.gridFull));
        let changeGrid = JSON.parse(JSON.stringify(this.state.gridFull));
       
        for(let i = 1; i<newGrid.length-1;i++){
            for(let j = 1; j<newGrid[i].length-1;j++){
               
               let numNeighbors = 0;
               const neighbors = [[-1,0],[1,0],[0,-1],[0,1],[1,1],[-1,-1],[1,-1],[-1,1]];
               for(let k = 0;k<neighbors.length;k++){
                   
                   if(newGrid[i+neighbors[k][0]][j+neighbors[k][1]]){
                       
                       numNeighbors++;
                       
                   }
               }
               
               //overpopulation check
                if(numNeighbors>3&&newGrid[i][j]){
                    changeGrid[i][j]=false;
                }
                
                 //loneliness check
                else if(numNeighbors<2&&newGrid[i][j]){
                    changeGrid[i][j]=false;
                }
                
                //reproduction check
                if (numNeighbors===3&&newGrid[i][j]===false){
                    changeGrid[i][j]=true;
                }
                
                
               
            }
            
            
        }
        
    this.setState({gridFull:changeGrid})

        
        
    }
   
    componentDidMount(){
     this.seed()
    }
    
    render(){
        
       
        
        return(
            <div>
            <h1>Game of Life</h1>
            <div className="containter">
            <button className="btn btn-success" onClick={()=>{this.startButton()}}>&#9654;
</button>
            <button className="btn btn-default" onClick={()=>{this.pause()}}>&#9208;
</button>
            <button className="btn btn-danger" onClick={()=>{this.stopButton()}}>&#8634;
</button>
          
            </div>
            
            
            <Grid gridFull={this.state.gridFull} rows = {this.rows} cols={this.cols} selectBox={this.selectBox} />
            
            <h2>Generations: {this.state.generation}</h2>
            
            </div>
            )
    }
}

export default App;