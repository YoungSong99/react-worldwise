import styles from './Button.module.css'
import PropTypes from "prop-types";

function Button({children, onClick, type}) {
    return (
        <button onClick={onClick} className={`${styles.btn} ${styles[type]}`}>{children}</button>
    )
}

Button.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    type: PropTypes.oneOf(['primary', 'secondary', 'tertiary']), // Define the possible types
};

Button.defaultProps = {
    type: 'primary'
};

export default Button
