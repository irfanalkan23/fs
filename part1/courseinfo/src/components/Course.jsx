const Header = (props) => {
    console.log(props)
    return (
        <div>
            <h1>{props.name}</h1>
        </div>
    )
}

const Part = (props) => {
    return (
        <div>
            <p>{props.name} {props.exercises}</p>
        </div>
    )
}

const Content = (props) => {
    console.log(props)
    const { parts } = props
    return (
        parts.map(part =>
            <div key={part.id}>
                <Part name={part.name} exercises={part.exercises} />
            </div>
        )
    )
}

const Total = (props) => {
    const { parts } = props
    const total = parts.reduce((sum, part) => sum + part.exercises, 0)
    return (
        <div>
            <p><strong>Number of exercises {total}</strong></p>
        </div>
    )
}

const Course = (props) => {
    return (
        <div>
            <Header name={props.course.name} />
            <Content parts={props.course.parts} />
            <Total parts={props.course.parts} />
        </div>
    )
}

export default Course