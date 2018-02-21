class Stopwatch extends React.Component {
    constructor(display) {
        super();
        this.state = {
            running: false,
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            },
            watch: ''
        };
    }
    
    format = (times) => {
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
    }

    start = () => {
        if (!this.state.running) {
            this.state.running = true;
            this.state.watch = setInterval(() => this.step(), 10);
        }
    }

    step = () => {
        if (!this.state.running) return;
        this.calculate() ;
    }

    calculate = () => {
        const copy = this.state.times;
        copy.miliseconds = this.state.times.miliseconds + 1
        this.setState({times: copy});
        if (this.state.times.miliseconds >= 100) {
            this.state.times.seconds += 1;
            this.state.times.miliseconds = 0;
        }
        if (this.state.times.seconds >= 60) {
            this.state.times.minutes += 1;
            this.state.times.seconds = 0;
        }
    }

    stop = () => {
        this.state.running = false;
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
