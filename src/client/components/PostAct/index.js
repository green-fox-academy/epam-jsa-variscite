import React from 'react';

class PostAct extends React.Component {
  render() {
    return (
      <div className='postAct'>
        {/* <button className='likeButton'>    Like</button> */}
        <button className='likeButton' type="button">
          <img className='likeIcon' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAB2klEQVRoQ+2Z0U3DMBCGz7oBKBu0G9Tq+R0mKGwAEwAblA1gA7oBTEB5txQ2oGzQvjcyspRKkDpN7VyLT0qeHfv/7j/bl4sC4Y8Srh96gP928GQOFEUxKMtySkRzTuiTAHjxm83mXSk1BoAlIl5rrT85QI4OUBO/1bxCRK21XnaFOCpAg/it5jkR3WQL0CIenHMfxpiLLAHaxHvR2QIcIr6K+jMR3WflQIR478ClMWaRDUCMeABYE9Ggq3j/PsspFCner8tyArEAJIhnS5/OACniAeCbiIYc6dMJIFG8X5Pl9NkGIHkPWGufAOAuNpJVCcFSBwUdsNa6kCgi+gNrrf0CALZU2BMIXy8tEPFBa72qj9txIAIgCBrrSMR4XwCO6hCSAILHrzSAJRGNfrsmDQDqe7EHiNiELEOlO/BGRFdi94BS6nYymbxIBQiW4GI2sXPu0RgzE3sTI+K55FKi8QNIRApVNVCwCZY9QFv7RQLA3u5F7gCtn59ZA4QuLknH6EG9o2wdaLq4xDjQdHFxArwCwJSlRt6d5ODOXXIKFUUxLsuyOALAGhGHobIhtFYygJ+sgvAFlv9RccYAM0fEWcyvp+TGFoNYlil6AJYwdpikd6BD8FheFe/AD0dYZkBkaW/+AAAAAElFTkSuQmCC"/>
          <span>Like</span>
        </button>
        <button className='commentButton' type="button">
          <img className='commentIcon' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAABd0lEQVRoQ+2Z0VHDMBBET5YLoAQ6IBpfAaYCoAKgA0qgA1ogHUAF8G95hDtICaEAW4xnwgwQG3LGWjLh9H3SavfpfnSGDmSZA/FBamTfSCoRJZIogcN/WiGE467rLmOMZaIQRccaY56zLFs651ZDGweJhBAWbds+EdGRSC198dpae+qce/kqNWjEe/9ARGfp7zVJ4ZGZz3c1EidJgDYx8xaAMSJqBAFFiSBSlmgoEUlaiFolgkhZoqFEJGkhapUIImWJhhKRpIWoVSKIlCUaSkSSFqJWiSBSlmgoEUlaiFolgkhZovEvifR/qyeSlIC1DTMvdvoyrev6JsZ4B7ycROqCmfu/6U9rdD6yMXO1R2QaIrodMtE7+tWgx3v/7R+xMea6KIp7SdxTa1MaWTJzTxSyUhlprLWlc24NcZHoab1uTGxNlVKamp0Isi8+BjO3EWhfpDIC74s5jbwPTf+kL2Yz0h9UVVWZ5/lqbP6dssFnNYK66E86bxyKyTNG92lcAAAAAElFTkSuQmCC"/>
          <span>Comment</span>
        </button>
        <button className='shareButton' type="button">
          <img className='shareIcon' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAEK0lEQVRoQ92ZXYjcVBTH/yeZWRB8EQVB8evND9qdJCeiZXfKdhURamEVFZ/qi1AVVPRFEKxoQVBBxS9QEaSIIip+gg91+6Ci672Z/apUrbVaWlxRREGFZXZz5I6TNc7OTJKZ7Ezc+5h7Pv6/nJOb3BvCJhm0STgwcBCt9aMAXmXmWp43cRggzwG4SUQmfN+fzQtmWCB7APyeJ8wwQUwxcoMZNkgEM+b7/qF+2qwIIBCRXwFs7wemECCmEv3CFAakX5hCgcRgtvm+/3WWZ6ZwIE3xP4vIeBaYooIYnkwwRQbJBJM7yMLCwmn1en1CRC4FUBGR84nobACnZun5yFZElkqlUtVxnCPd/HMBqdVq54VheD2AXQDGexHczUdEfiqXy9VKpfJNJ7u+QLTWuwHcDWBr3uLbxPvRtu3tnSrTE0gQBDtF5BEAFw0AYC2FqYxlWWOe533bmjcTyNzc3CUrKytPAZgYJEA8l4icGBkZqY6Ojh6LX08NEgTBVBiGrxDRKcOCiC0AJ2zbHnNd94foWioQpdQ+Irpv2AAt+U+Wy+XxqDKJIEqpx4noroJBNOSYNosq0xUkCIK9IvJAESFimr43lekIUqvVJsMwPFBwiEjewbYgMzMzp9u2/RWAM4oOErVXWxCl1GtEdOP/AGLJtu3LzOq1DmR2dnbb6urqp0WHMF/HAC5n5qNG6zoQrfUCgC0FBzEQVWY27d8Y/wFRSu0ioneKDNHc26/bQbaCHCCiyaKCdDugWAPRWl8I4HBRIZqHeR3Pv+IgDwO4t6Agf4hItdtZcRzkSwAXFxDEQEz6vv9FN20NkPn5+Qvq9fp3vUKY3iWizwEcFZFjlmUdFpEj0dIYj6uUepqIbk+Z60/Lsq50XfezJPsGiNb6TgBPJBm3zL8vItO2bU+7rjuf1ldr/QyA21LY/wXgKmb+JIXtP8uvUuoNIrouyUFEDhHR87Zt73cc57ck+3bzWutnAdyawncHMx9MYffve0QpdZyIzunkJCLvlkqlfY7jqLSBO9mlqYhlWVe4rvtRlly0uLh45vLy8lI7p2a/7/Y87+MsQbvZJoEQ0dWe532YNR8FQXCNueOtjiKyn4j2MLPp1dxGAshOZv6gl2Sktb4HwGMtzg8y895eAib5aK3NP0Tz621tiMiKZVnXep73XpJ/p3kD8iSAO2IG9zPzQ70GTPJrBRGRVcuypvqBMDkNyFsAppoCXmTmW5LE9DPf2lpm3+N53uv9xGyAKKVqROQAMJ/EW5m53m/QhIc9aq1QRG7wff/NPPKZipwEcJaIbOnnH15aMbGK3MzML6f1S7IzIGaT8vZGt1QkxLwQRUT7vv9Skrgs86a1fimXy6OVSsVUZsOH1vpcZj6edyJTkRcGVY28xcfjmRfiDs/zpjcyySBiJx6ZDkJEHjk2DcjfcbbkfPoE1mkAAAAASUVORK5CYII="/>
          <span>Share</span>
        </button>
      </div>
    );
  }
}

export default PostAct;
