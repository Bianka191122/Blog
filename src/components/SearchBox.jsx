import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

export const SearchBox=({items})=> {

    const navigate=useNavigate()

  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    //console.log(string, results)
  }

  const handleOnHover = (result) => {
    // the item hovered
    //console.log(result)
  }

  const handleOnSelect = (item) => {
    // the item selected
    //console.log(item.id)
    navigate('/detail/'+item.id)
  }

  const handleOnFocus = () => {
    //console.log('Focused')
  }

  const formatResult = (item) => {
    return (
      <>
        {/*<span style={{ display: 'block', textAlign: 'left' }}>id: {item.id}</span>*/}
        <span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>
      </>
    )
  }

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ width: 400 }}>
          <ReactSearchAutocomplete
            items={items}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            autoFocus
            formatResult={formatResult}
            styling={{
              zIndex:'100',
              backgroundColor:'rgb(70, 50, 30, 0.6)',
              iconColor:'rgb(220, 200, 170)',
              color:'rgb(220, 200, 170)',
              fontFamily: 'Handlee, sans-serif',
              fontSize:'larger',
              fontWeight:'bold',
              borderColor:'none',
              boxShadow:'none',
              width:200
            }}
          />
        </div>
      </header>
    </div>
  )
}