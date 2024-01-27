
export default function HsqToolsDropDown({ComingSoonBadge, isHsqToolsDropped}){
    return(
        <>
            <div className={`ml-4 mt-2 ${!isHsqToolsDropped ? 'd-none' : null}`}>
                <div className="mb-2">
                    <span className="user-select-none text-muted">Form Builder <ComingSoonBadge/> </span>
                </div>
                <div className="mb-2">
                <span className="user-select-none text-muted mt-3">Zen Projects <ComingSoonBadge/> </span>
                </div>
                <div className="mb-2">
                <span className="user-select-none text-muted mt-3">Vault <ComingSoonBadge/> </span>
                </div>
                {/* <div className="mb-2">
                <span className="user-select-none text-muted mt-3">HSQ Connect <ComingSoonBadge/> </span>
                </div>
                <div className="mb-2">
                <span className="user-select-none text-muted mt-3">HSQ Notes <ComingSoonBadge/> </span>
                </div> */}
            </div>
        </>
    )
}