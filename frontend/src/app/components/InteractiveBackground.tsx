'use client';

export default function InteractiveBackground() {
    return (
        <div className="gradient-bg" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: -1,
            overflow: 'hidden'
        }}>
            <div className="gradients-container">
                <div className="blob blob1"></div>
                <div className="blob blob2"></div>
                <div className="blob blob3"></div>
            </div>
        </div>
    );
}
