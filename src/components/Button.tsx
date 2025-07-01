    import { Button } from 'antd';

    interface buttonProps { 
        title: string;
        className?: string;
        onClick?: () => void;   
    }

    const ButtonComp = ({title,className,onClick}:buttonProps) => {

    return (
        <Button onClick={onClick} className={className} type="primary">{title}</Button>
    )
    }

    export default ButtonComp
