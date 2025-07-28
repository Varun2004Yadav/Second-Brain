export function Input({ ref, placeholder } : { ref?:any, placeholder?: string }) {
    return (
        <div>
            <input 
                type="text" 
                className="px-4 py-2 border rounded" 
                placeholder={placeholder}
                ref = {ref}
            />
        </div>
    );
}
