/*eslint-disable */
import '../../assets/css/toggleSlider.css'

export default function ToggleSldier({ bool, toggleBool }) {
    return (
        <>
            <div className="checkbox-wrapper-8">
                <input type="checkbox" id="cb3-8" className="tgl tgl-skewed"
                    checked={!bool} onChange={() => toggleBool()}
                />
                <label htmlFor="cb3-8" data-tg-on="Open"
                    data-tg-off="Closed" className="tgl-btn">
                </label>
            </div>
        </>
    )
}