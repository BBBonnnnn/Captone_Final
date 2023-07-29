import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DispatchType, RootState } from '../../redux/configStore';
import { SkinFilled } from '@ant-design/icons';
import * as yup from 'yup';
import { editProfile } from '../../redux/reducers/userReducer';

type Props = {};

export interface ProfileForm {
    email:string;
    phone: string;
    name: string;
    birthday: string;
    gender: string;
     skill: string[];
     certification: string[];
}

const ProfileModal2 = (props: Props) => {
    const { userLogin, userProfile } = useSelector((state: RootState) => state.userReducer);
    
    const dispatch:DispatchType = useDispatch();



    const [formState, setFormState] = useState<ProfileForm>({
        email: userProfile?.email||'',
        name: userProfile?.name || '',
        phone: userProfile?.phone ? String(userProfile.phone) : '',
        gender: userProfile?.gender ? String(userProfile.gender) : '',
        birthday: userProfile?.birthday || '',
        skill: userProfile?.skill || [],
         certification: userProfile?.certification || [],
    });



    const [errors, setErrors] = useState({
        "email": '',
        "name": '',
        "phone": '',
        "gender": 'gender cannot be null',
        "birthday": '',
        // "skill": '',
        // "certification": '',
    });
    useEffect(() => {
        // This effect runs whenever the `errors` state changes
        //console.log('Updated errors:', errors);
    }, [errors]);

    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const id = e.target.id;




        // Manually validate the field being changed
        let messageError = '';
        let dataType = e.target.getAttribute('data-type');
        let dataMinMaxLength = e.target.getAttribute('data-min-max-length');

        if (value.trim() === '') {
            messageError = id + ' cannot be blanked';
        } else {
            switch (dataType) {
                case 'number': {
                    // console.log('go h ere');
                    let regexNumber = /^[0-9]+$/;
                    if (!regexNumber.test(value)) {
                        messageError = id + ' is numbers';
                    }
                }; break;
                case 'letter': {
                    // console.log('go h ere');
                    let regexLetter = /^[A-Z a-záàạảãăặẵẳằắ]+$/;
                    if (!regexLetter.test(value)) {
                        messageError = id + ' is letters';
                    }
                }; break;
                case 'email': {
                    let regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                    if (!regexEmail.test(value)) {
                        messageError = id + ' is wrong form';
                    }
                }; break;
            }


            if (dataMinMaxLength) {
                let [min, max] = JSON.parse(dataMinMaxLength);
                if (value.length < min || value.length > max) {
                    messageError += ' ' + id + ` from ${min} - ${max} letter`;
                }
            }
        }

        



        // Update the form state and errors state with the new values
        if(id == "skill" || id == "certification" ){
            setFormState((prevFormState) => ({
                ...prevFormState,
                [id]: [value],
            }));
        }
        else{
            setFormState((prevFormState) => ({
                ...prevFormState,
                [id]: value,
            }));
        }
        if(id == "skill" || id == "certification" ){
            // 2 thang nay khong co validation
        }else{
            setErrors((prevErrors) => ({
                ...prevErrors,
                [id]: messageError,
            }));
        }
        

        console.log("formState: ", formState);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        const ListCheck :any = errors;
        let output = true;
        for (let key in ListCheck) {
            if (ListCheck[key] !== ''){
                output = false
            }
            
        }
        if(output == true){
            const actionAsync = editProfile(userLogin.user.id, formState);
            dispatch(actionAsync);
        }else{
            alert('check your Input again please');
        }
        
        
    };

    return (
        <form className="container my-5" onSubmit={handleSubmit}>
            <div className="mb-3">
                <p>email</p>
                <input data-type="email" data-min-max-length="[9,30]" className="form-control" id="email" name="email" onChange={handleChange} value={formState.email} />
                <p className='text text-danger'>{errors.email}</p>
            </div>
            <div className="mb-3">
                <p>Phone</p>
                <input data-type="number" data-min-max-length="[9,10]" className="form-control" id="phone" name="phone" onChange={handleChange} value={formState.phone} />
                <p className='text text-danger'>{errors.phone}</p>
            </div>

            <div className="mb-3">
                <label htmlFor="name">Name</label>
                <input data-type="letter" className="form-control" id="name" name="name" onChange={handleChange} value={formState.name} />
                <p className='text text-danger'>{errors.name}</p>
            </div>
            <div className="mb-3">
                <label htmlFor="birthday">Birthday</label>
                <input
                    type="date"
                    className="form-control"
                    id="birthday"
                    name="birthday"
                    onChange={handleChange}
                    value={formState.birthday}
                />
                <p className='text text-danger'>{errors.birthday}</p>
            </div>
            <div className="mb-3">
                <p>Gender</p>
                <div className="form-group">
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="true"
                            id='gender'
                            onChange={handleChange}
                            
                        />{' '}
                        Male
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="false"
                            id='gender'
                            onChange={handleChange}
                        />{' '}
                        Female
                    </label>
                </div>
                <p className='text text-danger'>{errors.gender}</p>
            </div>
             <div className="mb-3">
                <label htmlFor="skill">Skills</label>
                <input
                    className="form-control"
                    id="skill"
                    name="skill"
                    onChange={handleChange}
                    value={formState.skill}
                />

            </div>

            <div className="mb-3">
                <label htmlFor="certification">Certification</label>
                <input
                    className="form-control"
                    id="certification"
                    name="certification"
                    onChange={handleChange}
                    value={formState.certification}
                />
            </div> 
            <button type="submit" className="btn btn-primary">
                Save Changes
            </button>
        </form>
    );
};

export default ProfileModal2;
