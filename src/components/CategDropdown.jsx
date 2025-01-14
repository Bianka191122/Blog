import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export const CategDropdown = ({ categories, selCateg, setSelCateg }) => {
	const [dropdownOpen, setDropdownOpen] = useState(false);

	const toggle = () => setDropdownOpen((prevState) => !prevState);

	return (
		<div className="d-flex p-5">
			<Dropdown isOpen={dropdownOpen} toggle={toggle}
				style={{
					marginRight:'auto',
					marginLeft:'auto',
				  }}
			>
				<DropdownToggle caret
					style={{
						backgroundColor: 'rgb(70, 50, 30, 0.6)',
						color: 'rgb(220, 200, 170)',
						border: 'none',
						padding: '10px 20px',
						fontSize:'larger',
						borderRadius: '8px'
					  }}
				>
					{selCateg ? selCateg : "Category"}
				</DropdownToggle>
				<DropdownMenu
					style={{
						backgroundColor: 'rgb(130, 90, 50)',
						border: '1px solid #ddd', 
						borderRadius: '8px',
					  }}
				>
					{categories ? categories.map(obj =>
						<DropdownItem
							style={{ color: 'rgb(220, 200, 170)' }} 
							key={obj.name}
							onClick={() => setSelCateg(obj.name)}
						>
							{obj.name}
						</DropdownItem>

					)
						:
						<DropdownItem>No category available</DropdownItem>
					}
				</DropdownMenu>
			</Dropdown>
		</div>
	);
}