class Stopwatch extends React.Component {
    constructor(display) {
        super();
        this.watch = null;
        this.running = false;
        
        this.state = {
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            },
        };
    }
    
    format = (times) => {
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
    }

    start = () => {
        if (!this.state.running) {
            this.running = true;
            this.watch = setInterval(() => this.step(), 10);
        }
    }

    step = () => {
        if (!this.running) return;
        this.calculate() ;
    }

    calculate = () => {
        this.setState(prevState => {
            prevState.times.miliseconds = prevState.times.miliseconds + 1;

            if (prevState.times.miliseconds >= 100) {
                prevState.times.seconds += 1;
                prevState.times.miliseconds = 0;
            }
            if (prevState.times.seconds >= 60) {
                prevState.times.minutes += 1;
                prevState.times.seconds = 0;
            }

            return prevState;
        });        
    }

    stop = () => {
        this.running = false;
        clearInterval(this.watch);
    }

    render() {
        return (
            <div className = {'apka'}>
                <div className = {"buttons"}>
                    <a href={'#'} className={'button'} onClick={this.start}>
                        {'Start'}
                    </a>
                    <a href={'#'} className={'button'} onClick={this.stop}>
                        {'Stop'}
                    </a>
                </div>
        
                <div className={"display"}>
                    {this.format(this.state.times)}
                </div>
            </div> 
        )
    }

}

function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;

}


var apka = React.createElement(Stopwatch);
ReactDOM.render(apka, document.getElementById('app'))
