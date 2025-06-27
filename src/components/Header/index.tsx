import Image from "next/image";

interface IHeaderProps {
  newTransactionClick: () => void;
}

export function Header({ newTransactionClick }: IHeaderProps) {
  return (
    <header className="bg-header w-full h-[212px]" >
        <div className="max-w-[1120px] mx-auto flex row justify-between pt-8">
            <Image src="/logo.png" width={172} height={40} alt="Logo Image" />
            <button onClick={newTransactionClick}  className="bg-button text-white px-8 py-3 rounded-md hover:opacity-80"> Nova transação </button> 
        </div>
    </header>
  );
}