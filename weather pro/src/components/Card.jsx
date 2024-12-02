const Card = ({category, desc}) => {
    return (
        <div className="oneCard-div">
            <h4>{category}</h4>
            <h3>{desc}</h3>
        </div>
    );
};

export default Card;